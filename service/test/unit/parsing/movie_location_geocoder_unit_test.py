from doubles import InstanceDouble, allow

from app.parsing.movie_location_geocoder import MovieLocationGeocoder


class TestUnitMovieLocationGeocoder:
    SF_BOUNDS = {"southwest": (37.533, -122.56), "northeast": (37.838, -122.347)}

    def test_returns_not_found_when_gmaps_returns_no_results(self):
        gmapsMock = InstanceDouble("googlemaps.Client")
        allow(gmapsMock).geocode("No loc", bounds=self.SF_BOUNDS).and_return([])
        geocoder = MovieLocationGeocoder(gmapsMock)

        res = geocoder.geocode("No loc")

        assert not res.found

    def test_returns_coordinates_and_placeid_of_full_address_when_gmaps_returns_a_result(self):
        gmapsMock = InstanceDouble("googlemaps.Client")
        allow(gmapsMock).geocode("Some loc", bounds=self.SF_BOUNDS).and_return([{
            "geometry": {"location": {"lat": 37.7, "lng": -122.4}}, "place_id": "Pid"
        }])
        geocoder = MovieLocationGeocoder(gmapsMock)

        res = geocoder.geocode("Some loc")

        assert res.found
        assert res.place_id == "Pid"
        assert abs(37.7 - res.latitude) < 0.0001
        assert abs(-122.4 - res.longitude) < 0.0001

    def test_returns_coordinates_and_placeid_of_preparen_part_of_address_if_geocoding_full_address_returns_no_result(self):
        gmapsMock = InstanceDouble("googlemaps.Client")
        allow(gmapsMock).geocode("No loc (Some loc)", bounds=self.SF_BOUNDS).and_return([])
        allow(gmapsMock).geocode("No loc", bounds=self.SF_BOUNDS).and_return([{
            "geometry": {"location": {"lat": 37.7, "lng": -122.4}}, "place_id": "Pid"
        }])
        geocoder = MovieLocationGeocoder(gmapsMock)

        res = geocoder.geocode("No loc (Some loc)")

        assert res.found
        assert res.place_id == "Pid"
        assert abs(37.7 - res.latitude) < 0.0001
        assert abs(-122.4 - res.longitude) < 0.0001

    def test_returns_coordinates_and_placeid_of_paren_part_of_address_if_geocoding_full_address_and_preparen_part_returns_no_results(self):
        gmapsMock = InstanceDouble("googlemaps.Client")
        allow(gmapsMock).geocode("No loc (Some loc)", bounds=self.SF_BOUNDS).and_return([])
        allow(gmapsMock).geocode("No loc", bounds=self.SF_BOUNDS).and_return([])
        allow(gmapsMock).geocode("Some loc", bounds=self.SF_BOUNDS).and_return([{
            "geometry": {"location": {"lat": 37.7, "lng": -122.4}}, "place_id": "Pid"
        }])
        geocoder = MovieLocationGeocoder(gmapsMock)

        res = geocoder.geocode("No loc (Some loc)")

        assert res.found
        assert res.place_id == "Pid"
        assert abs(37.7 - res.latitude) < 0.0001
        assert abs(-122.4 - res.longitude) < 0.0001

    def test_caches_geocoded_locations_and_returns_them_on_subsequent_calls(self):
        gmapsMock = InstanceDouble("googlemaps.Client")
        allow(gmapsMock).geocode("Some loc", bounds=self.SF_BOUNDS).and_return([{
            "geometry": {"location": {"lat": 37.7, "lng": -122.4}}, "place_id": "Pid"
        }]).once()

        geocoder = MovieLocationGeocoder(gmapsMock)

        geocoder.geocode("Some loc")
        res = geocoder.geocode("Some loc")

        assert res.found
        assert res.place_id == "Pid"
        assert abs(37.7 - res.latitude) < 0.0001
        assert abs(-122.4 - res.longitude) < 0.0001

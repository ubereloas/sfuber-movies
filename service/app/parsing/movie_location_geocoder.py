class GeocodeResult(object):
    def __init__(self, found, latitude=0, longitude=0, place_id=None):
        self.found = found
        self.latitude = latitude
        self.longitude = longitude
        self.place_id = place_id


class MovieLocationGeocoder(object):
    SF_SOUTHWEST_BOUND = (37.533, -122.56)
    SF_NORTHEAST_BOUND = (37.838, -122.347)

    def __init__(self, gmaps_client):
        self.gmaps_client = gmaps_client
        self.cache = {}

    def geocode(self, location_name):
        if not location_name:
            return GeocodeResult(found=False)
        if location_name in self.cache:
            return self.cache[location_name]

        res = self.__geocode_name_variations(location_name)
        self.cache[location_name] = res
        return res

    def __geocode_name_variations(self, location_name):
        variations = [
            location_name,
            self.__preparen_part_of(location_name),
            self.__paren_part_of(location_name)
        ]
        for location_name in variations:
            res = self.__geocode_location(location_name)
            if res.found:
                return res
        return GeocodeResult(found=False)

    def __preparen_part_of(self, location_name):
        try:
            lparen = location_name.rindex("(")
            return location_name[:lparen].strip()
        except ValueError:
            return ""

    def __paren_part_of(self, location_name):
        try:
            lparen = location_name.rindex("(")
            rparen = location_name.rindex(")")
            return location_name[lparen + 1:rparen]
        except ValueError:
            return ""

    def __geocode_location(self, location_name):
        if not location_name:
            return GeocodeResult(found=False)

        res = self.gmaps_client.geocode(location_name, bounds={"southwest": self.SF_SOUTHWEST_BOUND,
                                                               "northeast": self.SF_NORTHEAST_BOUND})
        if res:
            latitude = res[0]['geometry']['location']['lat']
            longitude = res[0]['geometry']['location']['lng']
            return GeocodeResult(found=True, latitude=latitude, longitude=longitude, place_id=res[0]['place_id'])
        else:
            return GeocodeResult(found=False)

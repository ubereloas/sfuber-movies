from os import path

from app.parsing.datasf_movies_csv_parser import DataSFMoviesCsvParser


class TestUnitDataSFMoviesCsvParser:
    def test_parse_complete_csv_from_sf_data(self):
        with open(path.join(path.dirname(__file__), '../../../data/datasf_movies_10_18_2015.csv')) as input:
            parser = DataSFMoviesCsvParser()
            movies = parser.parse(input)

            assert len(movies) == 274

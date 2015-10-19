import io

from app.parsing.datasf_movies_csv_parser import DataSFMoviesCsvParser


class TestUnitDataSFMoviesCsvParser:
    def test_single_movie_with_all_data_and_single_location(self):
        input = io.StringIO((
            'Title,Release Year,Locations,Fun Facts,Production Company,Distributor,Director,Writer,Actor 1,Actor 2,Actor 3\n'
            'Movie1,2015,Loc1,FunFact1,ProdComp1,Distributor1,Director1,Writer1,Actor1,Actor2,Actor3'
        ))
        parser = DataSFMoviesCsvParser()

        movies = parser.parse(input)

        assert len(movies) == 1
        movie = movies[0]
        assert movie.title == "Movie1"
        assert movie.year == "2015"
        assert movie.production_company == "ProdComp1"
        assert movie.distributor == "Distributor1"
        assert movie.director == "Director1"
        assert movie.writer == "Writer1"

        assert len(movie.locations) == 1
        assert movie.locations[0].map_location.name == "Loc1"
        assert movie.locations[0].fun_fact == "FunFact1"

        assert len(movie.actors) == 3
        assert "Actor1" in movie.actors
        assert "Actor2" in movie.actors
        assert "Actor3" in movie.actors

    def test_ignores_empty_locations_in_single_rows(self):
        input = io.StringIO((
            'Title,Release Year,Locations,Fun Facts,Production Company,Distributor,Director,Writer,Actor 1,Actor 2,Actor 3\n'
            'Movie1,2015,,,ProdComp1,Distributor1,Director1,Writer1,Actor1,Actor2,Actor3'
        ))
        parser = DataSFMoviesCsvParser()

        movies = parser.parse(input)

        assert len(movies) == 1
        assert len(movies[0].locations) == 0

    def test_aggregates_nonempty_movie_locations_from_multiple_rows(self):
        input = io.StringIO((
            'Title,Release Year,Locations,Fun Facts,Production Company,Distributor,Director,Writer,Actor 1,Actor 2,Actor 3\n'
            'Movie1,2015,Loc1,FunFact1,ProdComp1,Distributor1,Director1,Writer1,Actor1,Actor2,Actor3\n'
            'Movie1,2015,,,ProdComp1,Distributor1,Director1,Writer1,Actor1,Actor2,Actor3\n'
            'Movie1,2015,Loc2,FunFact2,ProdComp1,Distributor1,Director1,Writer1,Actor1,Actor2,Actor3'
        ))
        parser = DataSFMoviesCsvParser()

        movies = parser.parse(input)

        assert len(movies) == 1
        movie = movies[0]
        assert len(movie.locations) == 2
        assert len([l for l in movie.locations if l.map_location.name == "Loc1" and l.fun_fact == "FunFact1"]) != 0
        assert len([l for l in movie.locations if l.map_location.name == "Loc2" and l.fun_fact == "FunFact2"]) != 0

    def test_stores_only_first_location_and_fun_fact_on_duplicate_locations(self):
        input = io.StringIO((
            'Title,Release Year,Locations,Fun Facts,Production Company,Distributor,Director,Writer,Actor 1,Actor 2,Actor 3\n'
            'Movie1,2015,Loc1,FunFact1,ProdComp1,Distributor1,Director1,Writer1,Actor1,Actor2,Actor3,\n'
            'Movie1,2015,Loc1,FunFact2,ProdComp1,Distributor1,Director1,Writer1,Actor1,Actor2,Actor3,\n'

        ))
        parser = DataSFMoviesCsvParser()

        movies = parser.parse(input)

        assert len(movies) == 1
        movie = movies[0]
        assert len(movie.locations) == 1
        assert movie.locations[0].map_location.name == "Loc1"
        assert movie.locations[0].fun_fact == "FunFact1"

    def test_ignores_empty_actor_columns(self):
        input = io.StringIO((
            'Title,Release Year,Locations,Fun Facts,Production Company,Distributor,Director,Writer,Actor 1,Actor 2,Actor 3\n'
            'Movie1,2015,Loc1,FunFact1,ProdComp1,Distributor1,Director1,Writer1,Actor1,,'
        ))
        parser = DataSFMoviesCsvParser()

        movies = parser.parse(input)

        assert len(movies) == 1
        movie = movies[0]
        assert len(movie.actors) == 1
        assert movie.actors[0] == "Actor1"

    def test_merges_different_actors_from_multiple_rows(self):
        input = io.StringIO((
            'Title,Release Year,Locations,Fun Facts,Production Company,Distributor,Director,Writer,Actor 1,Actor 2,Actor 3\n'
            'Movie1,2015,Loc1,FunFact1,ProdComp1,Distributor1,Director1,Writer1,Actor11,,\n'
            'Movie1,2015,Loc1,FunFact1,ProdComp1,Distributor1,Director1,Writer1,Actor21,,Actor23\n'
            'Movie1,2015,Loc1,FunFact1,ProdComp1,Distributor1,Director1,Writer1,Actor31,Actor23,Actor33'
        ))
        parser = DataSFMoviesCsvParser()

        movies = parser.parse(input)

        assert len(movies) == 1
        movie = movies[0]
        assert len(movie.actors) == 5
        assert "Actor11" in movie.actors
        assert "Actor21" in movie.actors
        assert "Actor23" in movie.actors
        assert "Actor31" in movie.actors
        assert "Actor33" in movie.actors

    def test_identifies_movies_by_both_title_and_year(self):
        input = io.StringIO((
            'Title,Release Year,Locations,Fun Facts,Production Company,Distributor,Director,Writer,Actor 1,Actor 2,Actor 3\n'
            'Movie1,2014,Loc1M1,FunFact1M1,ProdComp1M1,Distributor1M1,Director1M1,Writer1M1,Actor1M1,Actor2M1,Actor3M1\n'
            'Movie1,2015,Loc1M2,FunFact1M2,ProdComp1M2,Distributor1M2,Director1M2,Writer1M2,Actor1M2,Actor2M2,Actor3M2\n'
        ))
        parser = DataSFMoviesCsvParser()

        movies = parser.parse(input)

        assert len(movies) == 2
        assert len([m for m in movies if m.year == "2014" and m.writer == "Writer1M1"]) != 0
        assert len([m for m in movies if m.year == "2015" and m.writer == "Writer1M2"]) != 0

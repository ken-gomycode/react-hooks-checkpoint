import React, { useState } from "react";
import styled from "styled-components";
import {FilterProps, Movie, MovieCardProps, MovieListProps} from "./types.ts";
import {MOVIES} from "./movies.ts";

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => (
  <MovieCardContainer>
    <MovieImageWrapper>
      <MovieImage src={movie.posterURL} alt={movie.title} />
    </MovieImageWrapper>
    <MovieTitle>{movie.title}</MovieTitle>
    <MovieDescription>{movie.description}</MovieDescription>
    <MovieRating>Rating: {movie.rating}</MovieRating>
  </MovieCardContainer>
);

const MovieList: React.FC<MovieListProps> = ({ movies }) => (
  <MovieGrid>
    {movies.map((movie, index) => (
      <MovieCard key={index} movie={movie} />
    ))}
  </MovieGrid>
);

const Filter: React.FC<FilterProps> = ({ setFilter }) => (
  <FilterContainer>
    <Input
      type="text"
      placeholder="Search by title"
      onChange={(e) => setFilter((prev) => ({ ...prev, title: e.target.value }))}
    />
    <Input
      type="number"
      placeholder="Min rating"
      onChange={(e) => setFilter((prev) => ({ ...prev, rating: Number(e.target.value) }))}
    />
  </FilterContainer>
);

export default function App() {
  const [movies, setMovies] = useState<Movie[]>(MOVIES);
  const [filter, setFilter] = useState({ title: "", rating: 0 });

  const [newMovie, setNewMovie] = useState<Movie>({
    title: "",
    description: "",
    posterURL: "",
    rating: 0,
  });

  const addMovie = () => {
    setMovies([...movies, newMovie]);
    setNewMovie({ title: "", description: "", posterURL: "", rating: 0 });
  };

  const filteredMovies = movies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(filter.title.toLowerCase()) &&
      movie.rating >= filter.rating
  );

  return (
    <Container>
      <h1>Movie App</h1>
      <Filter setFilter={setFilter} />
      <MovieList movies={filteredMovies} />
      <BorderedSection>
        <h2>Add a New Movie</h2>
        <Input
          type="text"
          placeholder="Title"
          value={newMovie.title}
          onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
        />
        <Input
          type="text"
          placeholder="Description"
          value={newMovie.description}
          onChange={(e) => setNewMovie({ ...newMovie, description: e.target.value })}
        />
        <Input
          type="text"
          placeholder="Poster URL"
          value={newMovie.posterURL}
          onChange={(e) => setNewMovie({ ...newMovie, posterURL: e.target.value })}
        />
        <Input
          type="number"
          placeholder="Rating"
          value={newMovie.rating}
          onChange={(e) => setNewMovie({ ...newMovie, rating: Number(e.target.value) })}
        />
        <Button onClick={addMovie}>Add Movie</Button>
      </BorderedSection>
    </Container>
  );
}


// Styled components go here

const Container = styled.div`
  max-width: 800px;
  margin: auto;
  padding: 20px;
`;

const MovieCardContainer = styled.div`
  border: 1px solid #ddd;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const MovieImageWrapper = styled.div`
    height: 200px;
    border-radius: 8px;
    background: #ddd;
`

const MovieImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
    background: gray;
`;

const MovieTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-top: 10px;
`;

const MovieDescription = styled.p`
  font-size: 14px;
`;

const MovieRating = styled.p`
  font-weight: bold;
`;

const MovieGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 16px;
`;

const BorderedSection = styled.div`
    border: 1px solid #ddd;
    padding: 30px;
    border-radius: 8px;
    margin-top: 50px;
`

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  flex: 1;
  display: block;
  width: 100%;
  margin-bottom: 10px;
`;

const Button = styled.button`
    background-color: #111111;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    width: 100%;
`;
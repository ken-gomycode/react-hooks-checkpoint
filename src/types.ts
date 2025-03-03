import React from "react";

export interface Movie {
  title: string;
  description: string;
  posterURL: string;
  rating: number;
}

export interface FilterProps {
  setFilter: React.Dispatch<React.SetStateAction<{ title: string; rating: number }>>;
}

export interface MovieCardProps {
  movie: Movie;
}

export interface MovieListProps {
  movies: Movie[];
}
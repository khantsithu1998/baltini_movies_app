export type SearchResult = {
  Search: Movie[];
  totalResults: string;
  Response: string;
  nextPage? : number
};

export type Movie = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
  saved: boolean;
};

export type MovieDetails = {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: MovieRating[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
};

export type MovieRating = {
  Source: string;
  Value: string;
};

export type AnimesResult = {
  data: AnimeData;
};

export type AnimeData = {
  Page: AnimePage;
};

export type AnimePage = {
  pageInfo: AnimePageInfo;
  media: AnimeMedia[];
};

export type AnimeMedia = {
  id: number;
  title: AnimeTitle;
  bannerImage: string;
  coverImage: MediaCoverImage;
  description: string;
  genres: string[];
  saved: boolean;
  seasonYear: number;
};

export type MediaCoverImage = {
  color: string;
  extraLarge: string;
  large: string;
  medium: string;
};
export type AnimeTitle = {
  romaji: string;
  english : string;
};

export type AnimePageInfo = {
  total: number;
  currentPage: number;
  lastPage: number;
  hasNextPage: boolean;
  perPage: number;
};

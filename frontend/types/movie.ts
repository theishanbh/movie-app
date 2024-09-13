type Genre = {
  id?: number;
  name?: string;
};

type ProductionCompany = {
  id?: number;
  logo_path?: string;
  name?: string;
  origin_country?: string;
};

type SpokenLanguage = {
  english_name?: string;
  iso_639_1?: string;
  name?: string;
};

type BelongsToCollection = {
  id?: number;
  name?: string;
  poster_path?: string;
  backdrop_path?: string;
};

export type Movie = {
  id: number;
  poster_path: string;
  title: string;
  adult?: boolean;
  backdrop_path?: string;
  belongs_to_collection?: BelongsToCollection;
  budget?: number;
  genres?: Genre[];
  homepage?: string;
  imdb_id?: string;
  original_language?: string;
  original_title?: string;
  overview?: string;
  popularity?: number;
  production_companies?: ProductionCompany[];
  release_date?: string;
  revenue?: number;
  runtime?: number;
  spoken_languages?: SpokenLanguage[];
  status?: string;
  tagline?: string;
  vote_average?: number;
  vote_count?: number;
};

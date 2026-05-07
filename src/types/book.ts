export interface Book {
  id: number;
  title: string;
  authors: Author[];
  subjects: string[];
  bookshelves: string[];
  languages: string[];
  download_count: number;
  formats: Record<string, string>;
}

export interface Author {
  name: string;
  birth_year: number | null;
  death_year: number | null;
}

export interface GutendexResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Book[];
}
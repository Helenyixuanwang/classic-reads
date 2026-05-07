import type { Book, GutendexResponse } from '../types/book';

const BASE = 'https://gutendex.com';

export async function searchBooks(query: string, page = 1): Promise<GutendexResponse> {
  const params = new URLSearchParams({ search: query, page: String(page) });
  const res = await fetch(`${BASE}/books?${params}`);
  if (!res.ok) throw new Error('Search failed');
  return res.json();
}

export async function getBook(id: number): Promise<Book> {
  const res = await fetch(`${BASE}/books/${id}`);
  if (!res.ok) throw new Error('Book not found');
  return res.json();
}

export async function getBooksBySubject(subject: string, page = 1): Promise<GutendexResponse> {
  const params = new URLSearchParams({ topic: subject, page: String(page) });
  const res = await fetch(`${BASE}/books?${params}`);
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
}

export async function getPopularBooks(page = 1): Promise<GutendexResponse> {
  const params = new URLSearchParams({ sort: 'popular', page: String(page) });
  const res = await fetch(`${BASE}/books?${params}`);
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
}

export function getCoverUrl(book: Book): string | null {
  return (
    book.formats['image/jpeg'] ||
    null
  );
}

export function getReadUrl(book: Book): string | null {
  return (
    book.formats['text/html'] ||
    book.formats['text/html; charset=utf-8'] ||
    book.formats['text/plain'] ||
    null
  );
}

export function getAuthorDisplay(book: Book): string {
  if (!book.authors.length) return 'Unknown';
  return book.authors.map(a => {
    const years = a.birth_year && a.death_year
      ? ` (${a.birth_year}–${a.death_year})`
      : '';
    return a.name + years;
  }).join(', ');
}
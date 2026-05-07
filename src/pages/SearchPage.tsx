import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchBooks } from '../services/gutenberg';
import BookCard from '../components/BookCard';
import type { Book } from '../types/book';

export default function SearchPage() {
  const [params] = useSearchParams();
  const query = params.get('q') || '';
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    setPage(1);
    searchBooks(query, 1).then(d => {
      setBooks(d.results);
      setHasNext(!!d.next);
      setTotal(d.count);
      setLoading(false);
    });
  }, [query]);

  function loadMore() {
    const next = page + 1;
    searchBooks(query, next).then(d => {
      setBooks(prev => [...prev, ...d.results]);
      setHasNext(!!d.next);
      setPage(next);
    });
  }

  return (
    <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '2.5rem 1.5rem' }}>
      <div style={{ marginBottom: '2rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', marginBottom: '0.25rem' }}>
          {query ? `"${query}"` : 'Search'}
        </h2>
        {total > 0 && <p style={{ color: 'var(--muted)', fontSize: '0.9rem', fontStyle: 'italic' }}>{total.toLocaleString()} results</p>}
      </div>

      {loading && <p style={{ color: 'var(--muted)', fontStyle: 'italic' }}>Searching the stacks…</p>}

      {!loading && books.length === 0 && (
        <p style={{ color: 'var(--muted)', fontStyle: 'italic' }}>No results found for "{query}".</p>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        {books.map(b => <BookCard key={b.id} book={b} />)}
      </div>

      {hasNext && (
        <div style={{ textAlign: 'center' }}>
          <button onClick={loadMore} style={{ border: '1px solid var(--border)', background: 'transparent', padding: '0.6rem 2rem', fontFamily: "'EB Garamond', serif", fontSize: '1rem', color: 'var(--ink)', cursor: 'pointer', borderRadius: '2px' }}>
            Load more
          </button>
        </div>
      )}
    </main>
  );
}
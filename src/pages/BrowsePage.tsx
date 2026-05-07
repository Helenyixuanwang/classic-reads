import { useEffect, useState } from 'react';
import { getPopularBooks } from '../services/gutenberg';
import BookCard from '../components/BookCard';
import type { Book } from '../types/book';

export default function BrowsePage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPopularBooks(1).then(d => { setBooks(d.results); setHasNext(!!d.next); setLoading(false); });
  }, []);

  function loadMore() {
    const next = page + 1;
    getPopularBooks(next).then(d => {
      setBooks(prev => [...prev, ...d.results]);
      setHasNext(!!d.next);
      setPage(next);
    });
  }

  return (
    <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '2.5rem 1.5rem' }}>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem', marginBottom: '1.5rem' }}>
        Browse the Collection
      </h2>
      {loading && <p style={{ color: 'var(--muted)', fontStyle: 'italic' }}>Loading…</p>}
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
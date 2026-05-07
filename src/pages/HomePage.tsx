import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPopularBooks } from '../services/gutenberg';
import BookCard from '../components/BookCard';
import type { Book } from '../types/book';

const SUBJECTS = ['Fiction', 'Poetry', 'Philosophy', 'History', 'Science', 'Adventure'];

export default function HomePage() {
  const [popular, setPopular] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPopularBooks().then(d => { setPopular(d.results.slice(0, 6)); setLoading(false); });
  }, []);

  return (
    <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '3rem 1.5rem' }}>

      {/* Hero */}
      <section style={{ textAlign: 'center', marginBottom: '4rem', borderBottom: '1px solid var(--border)', paddingBottom: '3rem' }}>
        <p style={{ fontSize: '0.85rem', letterSpacing: '0.15em', color: 'var(--sepia)', textTransform: 'uppercase', marginBottom: '1rem' }}>Free · Public Domain · Timeless</p>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 700, lineHeight: 1.1, marginBottom: '1.5rem', color: 'var(--ink)' }}>
          The world's great<br />
          <em style={{ fontStyle: 'italic', color: 'var(--rust)' }}>literature</em>, free.
        </h2>
        <p style={{ fontSize: '1.1rem', color: 'var(--muted)', maxWidth: '480px', margin: '0 auto 2rem', fontStyle: 'italic' }}>
          Browse over 70,000 classic books from Project Gutenberg.
        </p>
        <Link to="/browse" style={{ display: 'inline-block', background: 'var(--ink)', color: 'var(--cream)', padding: '0.7rem 2rem', fontFamily: "'EB Garamond', serif", fontSize: '1rem', textDecoration: 'none', borderRadius: '2px' }}>
          Start Reading
        </Link>
      </section>

      {/* Subjects */}
      <section style={{ marginBottom: '4rem' }}>
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', marginBottom: '1.25rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>Browse by Subject</h3>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          {SUBJECTS.map(s => (
            <Link key={s} to={`/search?q=${s.toLowerCase()}`}
              style={{ border: '1px solid var(--border)', padding: '0.5rem 1.25rem', textDecoration: 'none', color: 'var(--ink)', fontFamily: "'EB Garamond', serif", fontSize: '0.95rem', borderRadius: '2px', background: 'var(--card-bg)', transition: 'all 0.15s' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--ink)'; e.currentTarget.style.color = 'var(--cream)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--card-bg)'; e.currentTarget.style.color = 'var(--ink)'; }}
            >{s}</Link>
          ))}
        </div>
      </section>

      {/* Popular */}
      <section>
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', marginBottom: '1.25rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>Most Downloaded</h3>
        {loading ? (
          <p style={{ color: 'var(--muted)', fontStyle: 'italic' }}>Loading…</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
            {popular.map(b => <BookCard key={b.id} book={b} />)}
          </div>
        )}
      </section>
    </main>
  );
}
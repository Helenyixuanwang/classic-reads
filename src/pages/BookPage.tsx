import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBook, getCoverUrl, getAuthorDisplay, getReadUrl } from '../services/gutenberg';
import type { Book } from '../types/book';

export default function BookPage() {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    getBook(Number(id)).then(b => { setBook(b); setLoading(false); });
  }, [id]);

  if (loading) return <main style={{ padding: '3rem', color: 'var(--muted)', fontStyle: 'italic' }}>Loading…</main>;
  if (!book) return <main style={{ padding: '3rem' }}>Book not found.</main>;

  const cover = getCoverUrl(book);
  const readUrl = getReadUrl(book);

  return (
    <main style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem 1.5rem' }}>
      <Link to="/" style={{ color: 'var(--sepia)', fontSize: '0.9rem', textDecoration: 'none', display: 'inline-block', marginBottom: '2rem' }}>← Back</Link>

      <div style={{ display: 'flex', gap: '2.5rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
        {cover && <img src={cover} alt={book.title} style={{ width: '140px', height: '210px', objectFit: 'cover', border: '1px solid var(--border)', flexShrink: 0 }} />}
        <div style={{ flex: 1, minWidth: '200px' }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', lineHeight: 1.2, marginBottom: '0.75rem' }}>{book.title}</h1>
          <p style={{ color: 'var(--muted)', fontStyle: 'italic', marginBottom: '0.5rem', fontSize: '1.15rem' }}>{getAuthorDisplay(book)}</p>
          <p style={{ color: 'var(--sepia)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>↓ {book.download_count.toLocaleString()} downloads</p>

          {readUrl && (
            <a href={readUrl} target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-block', background: 'var(--ink)', color: 'var(--cream)', padding: '0.65rem 1.75rem', textDecoration: 'none', fontFamily: "'EB Garamond', serif", fontSize: '1rem', borderRadius: '2px', marginRight: '0.75rem' }}>
              Read Online →
            </a>
          )}
          <a href={`https://www.gutenberg.org/ebooks/${book.id}`} target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-block', border: '1px solid var(--border)', color: 'var(--ink)', padding: '0.65rem 1.75rem', textDecoration: 'none', fontFamily: "'EB Garamond', serif", fontSize: '1rem', borderRadius: '2px' }}>
            Gutenberg Page
          </a>
        </div>
      </div>

      {book.subjects.length > 0 && (
        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '0.8rem', marginBottom: '0.5rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Subjects</h3>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {book.subjects.slice(0, 8).map(s => (
              <Link key={s} to={`/search?q=${encodeURIComponent(s.split(' -- ')[0])}`}
                style={{ border: '1px solid var(--border)', padding: '0.25rem 0.75rem', fontSize: '0.8rem', textDecoration: 'none', color: 'var(--muted)', borderRadius: '2px', fontFamily: "'EB Garamond', serif" }}>
                {s.split(' -- ')[0]}
              </Link>
            ))}
          </div>
        </div>
      )}

      <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '0.8rem', marginBottom: '0.75rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Available Formats</h3>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {Object.entries(book.formats).filter(([k]) => !k.includes('zip') && !k.includes('application/rdf')).map(([fmt, url]) => (
            <a key={fmt} href={url} target="_blank" rel="noopener noreferrer"
              style={{ fontSize: '0.78rem', color: 'var(--sepia)', textDecoration: 'none', border: '1px solid var(--border)', padding: '0.2rem 0.6rem', borderRadius: '2px', fontFamily: 'monospace' }}>
              {fmt.split(';')[0].split('/')[1] ?? fmt}
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
import { Link } from 'react-router-dom';
import type { Book } from '../types/book';
import { getCoverUrl, getAuthorDisplay } from '../services/gutenberg';

interface Props { book: Book; }

export default function BookCard({ book }: Props) {
  const cover = getCoverUrl(book);

  return (
    <Link to={`/book/${book.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div style={{
        background: 'var(--card-bg)',
        border: '1px solid var(--border)',
        padding: '1rem',
        display: 'flex',
        gap: '0.875rem',
        transition: 'box-shadow 0.2s',
        cursor: 'pointer',
      }}
        onMouseEnter={e => (e.currentTarget.style.boxShadow = '3px 3px 0 var(--border)')}
        onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
      >
        {cover ? (
          <img src={cover} alt={book.title} style={{ width: '60px', height: '88px', objectFit: 'cover', flexShrink: 0, border: '1px solid var(--border)' }} />
        ) : (
          <div style={{ width: '60px', height: '88px', background: 'var(--border)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '1.5rem', color: 'var(--muted)' }}>📖</span>
          </div>
        )}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '0.95rem', fontWeight: 600, lineHeight: 1.3, marginBottom: '0.3rem', color: 'var(--ink)' }}>{book.title}</p>
          <p style={{ fontSize: '0.82rem', color: 'var(--muted)', fontStyle: 'italic', marginBottom: '0.4rem' }}>{getAuthorDisplay(book)}</p>
          <p style={{ fontSize: '0.75rem', color: 'var(--sepia)' }}>↓ {book.download_count.toLocaleString()} downloads</p>
        </div>
      </div>
    </Link>
  );
}
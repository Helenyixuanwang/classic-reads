import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Navbar() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setQuery('');
    }
  }

  return (
    <header style={{ borderBottom: '1px solid var(--border)', background: 'var(--cream)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.02em' }}>
            classic<span style={{ color: 'var(--rust)' }}>reads</span>
          </h1>
        </Link>

        <nav style={{ display: 'flex', gap: '1.5rem', flex: 1 }}>
          {[['/', 'Home'], ['/browse', 'Browse'], ['/search?q=fiction', 'Fiction'], ['/search?q=poetry', 'Poetry']].map(([to, label]) => (
            <Link key={to} to={to} style={{ textDecoration: 'none', color: 'var(--muted)', fontSize: '0.95rem', fontFamily: "'EB Garamond', serif" }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--ink)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
            >{label}</Link>
          ))}
        </nav>

        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search titles, authors…"
            style={{ border: '1px solid var(--border)', background: 'transparent', padding: '0.4rem 0.8rem', fontFamily: "'EB Garamond', serif", fontSize: '0.95rem', color: 'var(--ink)', borderRadius: '2px', width: '200px', outline: 'none' }}
          />
          <button type="submit" style={{ background: 'var(--ink)', color: 'var(--cream)', border: 'none', padding: '0.4rem 0.9rem', fontFamily: "'EB Garamond', serif", fontSize: '0.9rem', cursor: 'pointer', borderRadius: '2px' }}>
            Search
          </button>
        </form>
      </div>
    </header>
  );
}
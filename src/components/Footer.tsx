export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border)', marginTop: 'auto', padding: '1.5rem', textAlign: 'center' }}>
      <p style={{ fontSize: '0.82rem', color: 'var(--muted)', fontFamily: "'EB Garamond', serif" }}>
        Built by{' '}
        <a href="https://linkedin.com/in/helenyixuanwang" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--sepia)', textDecoration: 'none' }}>Helen Wang</a>
        {' · '}
        <a href="https://github.com/Helenyixuanwang" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--sepia)', textDecoration: 'none' }}>GitHub</a>
        {' · '}
        Powered by <a href="https://gutendex.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--sepia)', textDecoration: 'none' }}>Project Gutenberg</a>
      </p>
    </footer>
  );
}
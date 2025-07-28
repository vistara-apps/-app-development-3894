function SkipLink() {
  return (
    <a 
      href="#main-content"
      className="skip-link"
      onFocus={(e) => e.target.classList.add('focused')}
      onBlur={(e) => e.target.classList.remove('focused')}
    >
      Skip to main content
    </a>
  );
}

export default SkipLink;

// Add styles for skip link
const skipLinkStyles = `
.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: var(--color-primary-500);
  color: var(--color-text-primary);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-base);
  text-decoration: none;
  font-weight: var(--font-weight-semibold);
  z-index: var(--z-tooltip);
  transition: top var(--transition-fast);
}

.skip-link:focus,
.skip-link.focused {
  top: 6px;
}
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = skipLinkStyles;
  document.head.appendChild(styleSheet);
}


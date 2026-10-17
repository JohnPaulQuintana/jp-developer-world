
type HeaderProps = {
  onHome: () => void
}

export default function Header({ onHome }: HeaderProps) {
  return (
    <header className="topbar">
      <button
        type="button"
        className="brand"
        onClick={onHome}
        aria-label="Return to home"
      >
        <span className="brand-mark">JP</span>

        <span className="brand-copy">
          <strong>DEVELOPER WORLD</strong>
          <small>
            Explore <i /> Build <i /> Connect
          </small>
        </span>
      </button>

      <div className="top-status">
        <span className="status-dot" />
        INTERACTIVE DEVELOPER PORTFOLIO
      </div>
    </header>
  )
}

type HeaderProps = {
  onHome: () => void;
};

export default function Header({ onHome }: HeaderProps) {
  return (
    <header className="topbar">
      <button
        type="button"
        className="brand"
        onClick={onHome}
        aria-label="Return to home"
      >
        <span className="brand-mark flex h-10 w-10 items-center justify-center rounded-xl bg-[#064225] text-sm font-extrabold tracking-tight text-[#06110d]">
          JP
        </span>

        <span className="brand-copy">
          <strong>SOFTWARE ENGINEER</strong>
          <small>
            Create <i /> Explore <i /> Innovate
          </small>
        </span>
      </button>

      <div className="top-status">
        <span className="status-dot" />
        <span>THE WORLD OF A DEVELOPER</span>
      </div>
    </header>
  );
}

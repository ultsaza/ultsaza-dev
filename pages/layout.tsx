import type { ReactNode } from "react";
import "../src/styles/site.css";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <header className="site-header">
        <a className="site-title" href="/">
          ultsaza.dev
        </a>
      </header>
      <main className="site-main" id="main-content">
        {children}
      </main>
      <footer className="site-footer">
        <small>© 2026 ultsaza</small>
      </footer>
    </>
  );
}

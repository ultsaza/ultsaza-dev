import type { ReactNode } from "react";
import { useFrontmatter } from "@void/md";
import { formatDate } from "../../src/date";

export default function PostLayout({ children }: { children: ReactNode }) {
  const fm = useFrontmatter();
  const title = typeof fm.title === "string" ? fm.title : "";
  const date = typeof fm.date === "string" ? fm.date : null;
  const dateLabel = date ? formatDate(date) : null;

  return (
    <article className="post">
      <header className="post-header">
        <h1>{title}</h1>
        {date && dateLabel && <time dateTime={date}>{dateLabel}</time>}
      </header>
      <div className="void-md">{children}</div>
    </article>
  );
}

import { formatDate } from "../src/date";
import { posts } from "../src/posts";

export default function HomePage() {
  return (
    <>
      <section className="intro">
        <h1>ultsaza.dev</h1>
        <p>ultsaza の個人ブログです。</p>
      </section>
      <section className="post-list" aria-labelledby="post-list-title">
        <h2 id="post-list-title">記事</h2>
        {posts.length > 0 ? (
          <ul>
            {posts.map((post) => {
              const dateLabel = post.date ? formatDate(post.date) : null;
              return (
                <li key={post.path}>
                  <a href={post.path}>{post.title}</a>
                  <div className="post-meta">
                    {dateLabel && <time dateTime={post.date}>{dateLabel}</time>}
                    {post.draft && <span className="post-draft">下書き</span>}
                  </div>
                  {post.description && <p>{post.description}</p>}
                </li>
              );
            })}
          </ul>
        ) : (
          <p>まだ記事がありません。</p>
        )}
      </section>
    </>
  );
}

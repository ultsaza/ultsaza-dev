import pages from "@void/md/pages";

export type Post = {
  path: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  draft: boolean;
};

const text = (value: unknown) => (typeof value === "string" ? value : "");

const allPosts: Post[] = pages
  .filter((page) => page.path.startsWith("/posts/"))
  .map((page) => ({
    path: page.path,
    title: page.title,
    description: text(page.frontmatter.description),
    date: text(page.frontmatter.date),
    tags: Array.isArray(page.frontmatter.tags) ? page.frontmatter.tags.map(String) : [],
    draft: page.frontmatter.draft === true,
  }))
  // "YYYY-MM-DD" strings sort chronologically; newest first.
  .sort((a, b) => b.date.localeCompare(a.date));

// Drafts are listed only in `vp dev`.
export const posts = import.meta.env.DEV ? allPosts : allPosts.filter((post) => !post.draft);

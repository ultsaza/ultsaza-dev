// Frontmatter dates are "YYYY-MM-DD". Format in UTC so the day never shifts.
const dateFormat = new Intl.DateTimeFormat("ja-JP", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

export function formatDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.valueOf()) ? null : dateFormat.format(date);
}

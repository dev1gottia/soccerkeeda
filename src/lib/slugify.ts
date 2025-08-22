export default function slugify(str: string): string {
  return str
    .toLowerCase() // convert to lowercase
    .trim() // remove leading/trailing spaces
    .replace(/[^\w\s-]/g, "") // remove special chars (except spaces and hyphens)
    .replace(/\s+/g, "-") // replace spaces with -
    .replace(/-+/g, "-"); // collapse multiple - into one
}

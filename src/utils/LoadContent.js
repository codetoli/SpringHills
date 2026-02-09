// Browser-safe frontmatter parser (no Node, no Buffer)
function parseFrontmatter(raw) {
  const match = raw.match(/^---\s*([\s\S]*?)\s*---/);
  if (!match) return {};

  const yaml = match[1];
  const data = {};

  const lines = yaml.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (!line) continue;

    // Handle image list
    if (line.startsWith("- image:")) {
      if (!data.images) data.images = [];
      data.images.push({
        image: line.replace("- image:", "").trim(),
      });
      continue;
    }

    // Skip list key itself (images:)
    if (line.endsWith(":")) {
      if (line.startsWith("images")) data.images = [];
      continue;
    }

    // Normal key: value
    const [key, ...rest] = line.split(":");
    let value = rest.join(":").trim();

    // Remove quotes
    value = value.replace(/^["']|["']$/g, "");

    // Convert boolean
    if (value === "true") value = true;
    if (value === "false") value = false;

    data[key.trim()] = value;
  }

  return data;
}

// Content loaders
const contentModules = {
  events: import.meta.glob("/src/content/events/*.md", {
    query: "?raw",
    import: "default",
  }),
  notices: import.meta.glob("/src/content/notices/*.md", {
    query: "?raw",
    import: "default",
  }),
};

export async function LoadContent(type) {
  const files = contentModules[type];

  if (!files) {
    throw new Error(`Unknown content type: ${type}`);
  }

  const entries = await Promise.all(
    Object.entries(files).map(async ([path, resolver]) => {
      const raw = await resolver();
      const data = parseFrontmatter(raw);

      return {
        ...data,
        slug: path.split("/").pop().replace(".md", ""),
      };
    })
  );

  return entries;
}

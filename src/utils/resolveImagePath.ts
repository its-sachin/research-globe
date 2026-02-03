const remoteProtocol = /^(https?:)?\/\//i;

const bundledImages = import.meta.glob('../../assets/images/**/*.{png,jpg,jpeg,svg,webp,gif,avif}', {
  eager: true,
  import: 'default'
}) as Record<string, string>;

const imageMap: Record<string, string> = {};

for (const [key, url] of Object.entries(bundledImages)) {
  // key example: "../../assets/images/jailbreak.png"
  const normalized = key.replace(/^\.\.\/\.\.\//, ''); // "assets/images/jailbreak.png"
  imageMap[normalized] = url;
  imageMap[normalized.replace(/^assets\//, '')] = url; // "images/jailbreak.png"
  imageMap[normalized.replace(/^assets\/images\//, '')] = url; // "jailbreak.png"
}

export function resolveImagePath(imagePath?: string | null): string | undefined {
  if (!imagePath) return undefined;

  const trimmed = imagePath.trim();
  if (!trimmed) return undefined;

  // Already a usable URL.
  if (remoteProtocol.test(trimmed) || trimmed.startsWith('data:') || trimmed.startsWith('blob:')) return trimmed;

  // Try common local forms.
  const withoutLeadingSlash = trimmed.replace(/^\//, '');

  return (
    imageMap[withoutLeadingSlash] ??
    imageMap[withoutLeadingSlash.replace(/^\.\//, '')] ??
    imageMap[withoutLeadingSlash.replace(/^public\//, '')] ??
    // If someone passes "assets/images/foo.png" but with extra segments,
    // a simple fallback is to try just the filename.
    imageMap[withoutLeadingSlash.split('/').pop() ?? '']
  );
}

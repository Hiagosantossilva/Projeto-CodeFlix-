export function getProjectTitle(item) {
  return item.title || item.name || item.original_name || item.original_title || 'Projeto sem título';
}

export function getProjectGenres(item) {
  const labels = { Javascript: 'JavaScript', 'Front-End': 'Front-end', Wordpress: 'WordPress' };
  return (Array.isArray(item.genres) ? item.genres : [])
    .map(genre => typeof genre === 'string' ? genre : genre?.name)
    .filter(Boolean)
    .map(genre => labels[genre] || genre);
}

export function getProjectYear(item) {
  return (item.release_date || item.first_air_date || '').match(/^\d{4}/)?.[0];
}

export function resolveAsset(path) {
  if (!path) return `${process.env.PUBLIC_URL}/project-placeholder.svg`;
  if (/^https?:\/\//i.test(path)) return path;
  return `${process.env.PUBLIC_URL}/${path.replace(/^\/+/, '')}`;
}

export function resolveProjectLink(link) {
  if (!link || !link.trim()) return null;
  const value = link.trim();
  if (/^https?:\/\//i.test(value)) return value;
  if (!/^[\w.-]+\.[a-z]{2,}(?:[/:?#]|$)/i.test(value)) return null;
  return `https://${value}`;
}

export function handleImageError(event) {
  const fallback = resolveAsset();
  if (event.currentTarget.getAttribute('src') !== fallback) {
    event.currentTarget.src = fallback;
  }
}

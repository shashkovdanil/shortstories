export function getPhoto(url) {
  if (typeof url === 'string') return url
  return '/images/user-placeholder.svg'
}

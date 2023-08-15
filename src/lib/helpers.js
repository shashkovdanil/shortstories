export function getPhoto(url) {
  if (typeof url === 'string') return url
  return '/static/images/user-placeholder.svg'
}

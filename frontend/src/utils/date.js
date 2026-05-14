export function formatDate(value) {
  if (!value) return 'No date'

  const date = new Date(value)

  if (isNaN(date.getTime())) {
    return 'Invalid date'
  }

  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date)
}
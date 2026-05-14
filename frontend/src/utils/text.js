export function excerpt(markdown, length = 190) {
  const plain = markdown
    .replace(/[#>*_`[\]()]/g, '')
    .replace(/\s+/g, ' ')
    .trim()

  if (plain.length <= length) return plain
  return `${plain.slice(0, length).trim()}...`
}

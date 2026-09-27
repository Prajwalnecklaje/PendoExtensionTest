export function cn(...values) {
  const classes = []

  const visit = (value) => {
    if (!value) return
    if (typeof value === 'string' || typeof value === 'number') {
      classes.push(String(value))
      return
    }
    if (Array.isArray(value)) {
      value.forEach(visit)
      return
    }
    if (typeof value === 'object') {
      Object.entries(value).forEach(([key, enabled]) => enabled && classes.push(key))
    }
  }

  values.forEach(visit)
  return classes.join(' ')
}

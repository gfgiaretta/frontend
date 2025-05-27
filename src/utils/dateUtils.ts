export function getTimeSince(
  dateInput: string | Date,
  t: (key: string) => string,
): string {
  const date = new Date(dateInput)
  const now = new Date()

  if (isNaN(date.getTime())) return t('invalidDate')

  const MS_PER_MINUTE = 60000
  const MINUTES_PER_HOUR = 60
  const HOURS_PER_DAY = 24
  const DAYS_PER_WEEK = 7

  const diffMinutes = Math.floor(
    (now.getTime() - date.getTime()) / MS_PER_MINUTE,
  )
  if (diffMinutes < MINUTES_PER_HOUR)
    // eslint-disable-next-line no-magic-numbers
    return `${diffMinutes} ${t('minute')}${diffMinutes !== 1 ? 's' : ''}`
  const diffHours = Math.floor(diffMinutes / MINUTES_PER_HOUR)
  if (diffHours < HOURS_PER_DAY)
    // eslint-disable-next-line no-magic-numbers
    return `${diffHours} ${t('hour')}${diffHours !== 1 ? 's' : ''}`
  const diffDays = Math.floor(diffHours / HOURS_PER_DAY)
  if (diffDays < DAYS_PER_WEEK)
    // eslint-disable-next-line no-magic-numbers
    return `${diffDays} ${t('day')}${diffDays !== 1 ? 's' : ''}`
  const diffWeeks = Math.floor(diffDays / DAYS_PER_WEEK)
  // eslint-disable-next-line no-magic-numbers
  return `${diffWeeks} ${t('week')}${diffWeeks !== 1 ? 's' : ''}`
}

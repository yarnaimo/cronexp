import { CronDate, parseExpression, ParserOptions } from 'cron-parser'

export const getCronSchedules = (
  expression: string,
  limit = 10,
  options?: ParserOptions<true>,
) => {
  const cron = parseExpression(expression, { iterator: true, ...options })
  const results: CronDate[] = []

  for (const _ of Array.from({ length: limit })) {
    const obj = cron.next()
    results.push(obj.value)
    if (obj.done) {
      break
    }
  }

  return results
}

const everyOrValue = <T>(values: readonly T[], defaultLength: number) =>
  values.length === defaultLength ? 'every' : values.join(',')

export const formatCronDate = (cronDate: CronDate) =>
  (cronDate as any)._date.toFormat('yyyy-MM-dd HH:mm:ss')

const wdays = [...'日月火水木金土']

export const formatCronExpression = (expression: string) => {
  const {
    fields: { month, dayOfMonth, dayOfWeek, hour, minute },
  } = parseExpression(expression)

  const entries = [
    ['月  ', everyOrValue(month, 12)],
    ['日  ', everyOrValue(dayOfMonth, 31)],
    [
      '曜日',
      everyOrValue(
        dayOfWeek.map((n) => wdays[n]!),
        8,
      ),
    ],
    ['時  ', everyOrValue(hour, 24)],
    ['分  ', everyOrValue(minute, 60)],
  ] as const

  const str = entries.map(([key, value]) => `- ${key} : ${value}`).join('\n')
  return str
}

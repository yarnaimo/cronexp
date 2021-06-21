#!/usr/bin/env node

import { formatCronDate, formatCronExpression, getCronSchedules } from '../cli'

const [, , expression, limit] = process.argv

if (!expression) {
  console.error('Expression must be specified')
  process.exit(1)
}

console.log('[Config]')
console.log(formatCronExpression(expression))

console.log()

console.log('[Schedule]')
console.log(
  getCronSchedules(expression, limit ? parseInt(limit) : undefined)
    .map((cronDate) => `- ${formatCronDate(cronDate)}`)
    .join('\n'),
)

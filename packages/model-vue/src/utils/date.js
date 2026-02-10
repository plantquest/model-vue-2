/**
 * Date Utility Module
 * 
 * Centralized date handling using Day.js
 * Replaces native Date object usage for consistency
 * 
 * @module utils/date
 * @see https://day.js.org/docs/en/installation/installation
 */

import dayjs from 'dayjs'
import relativeTimePlugin from 'dayjs/plugin/relativeTime'
import customParseFormatPlugin from 'dayjs/plugin/customParseFormat'
import utcPlugin from 'dayjs/plugin/utc'

// Extend Day.js with required plugins
dayjs.extend(relativeTimePlugin)
dayjs.extend(customParseFormatPlugin)
dayjs.extend(utcPlugin)

/**
 * Standard date format constants
 * Use these for consistent date formatting across the application
 */
export const formatters = {
  // ISO format for API/storage (YYYY-MM-DDTHH:mm:ss)
  iso: 'YYYY-MM-DDTHH:mm:ss',
  
  // ISO date only (YYYY-MM-DD)
  isoDate: 'YYYY-MM-DD',
  
  // ISO time only (HH:mm:ss)
  isoTime: 'HH:mm:ss',
  
  // Standard display formats
  standard: 'YYYY-MM-DD',
  display: 'MMM D, YYYY',
  full: 'MMMM D, YYYY h:mm A',
  fullDate: 'MMMM D, YYYY',
  
  // Time formats
  time: 'h:mm A',
  time24: 'HH:mm',
  timeWithSeconds: 'h:mm:ss A',
  time24WithSeconds: 'HH:mm:ss',
  
  // Compact formats
  compact: 'MM/DD/YY',
  short: 'M/D/YYYY',
  monthYear: 'MMMM YYYY',
  monthYearShort: 'MMM YYYY',
  
  // Relative time (use with .fromNow())
  relative: 'fromNow'
}

/**
 * Format a date using a predefined formatter or custom format string
 * 
 * @param {Date|string|number} date - Date to format
 * @param {string} format - Format key from formatters or custom format string
 * @returns {string} Formatted date string
 * 
 * @example
 * formatDate(new Date(), 'display') // "Feb 10, 2026"
 * formatDate('2026-02-10', 'full') // "February 10, 2026 12:00 AM"
 * formatDate(Date.now(), 'YYYY-MM-DD HH:mm') // "2026-02-10 14:30"
 */
export function formatDate(date, format = 'display') {
  if (!date) return ''
  
  const dayjsDate = dayjs(date)
  
  // Check if date is valid
  if (!dayjsDate.isValid()) {
    console.warn('[date.js] Invalid date provided:', date)
    return ''
  }
  
  // Use predefined formatter if available
  const formatString = formatters[format] || format
  
  return dayjsDate.format(formatString)
}

/**
 * Get relative time string (e.g., "2 hours ago", "in 3 days")
 * 
 * @param {Date|string|number} date - Date to calculate relative time from
 * @param {Date|string|number} [baseDate] - Base date to compare against (defaults to now)
 * @returns {string} Relative time string
 * 
 * @example
 * relativeTime(Date.now() - 3600000) // "an hour ago"
 * relativeTime('2026-02-11') // "in a day"
 * relativeTime('2026-02-09', '2026-02-10') // "a day ago"
 */
export function relativeTime(date, baseDate = null) {
  if (!date) return ''
  
  const dayjsDate = dayjs(date)
  
  if (!dayjsDate.isValid()) {
    console.warn('[date.js] Invalid date provided:', date)
    return ''
  }
  
  if (baseDate) {
    return dayjsDate.from(dayjs(baseDate))
  }
  
  return dayjsDate.fromNow()
}

/**
 * Parse a date string with a custom format
 * 
 * @param {string} dateString - Date string to parse
 * @param {string} format - Format of the date string
 * @param {boolean} [strict=false] - Use strict parsing mode
 * @returns {dayjs.Dayjs} Day.js instance
 * 
 * @example
 * parseDate('02/10/2026', 'MM/DD/YYYY') // Valid Day.js instance
 * parseDate('2026-02-10', 'YYYY-MM-DD') // Valid Day.js instance
 */
export function parseDate(dateString, format, strict = false) {
  return dayjs(dateString, format, strict)
}

/**
 * Check if a date is valid
 * 
 * @param {Date|string|number} date - Date to validate
 * @returns {boolean} True if valid, false otherwise
 * 
 * @example
 * isValidDate('2026-02-10') // true
 * isValidDate('invalid') // false
 * isValidDate(null) // false
 */
export function isValidDate(date) {
  if (!date) return false
  return dayjs(date).isValid()
}

/**
 * Get current timestamp
 * 
 * @returns {number} Current timestamp in milliseconds
 * 
 * @example
 * now() // 1707584123456
 */
export function now() {
  return Date.now()
}

/**
 * Get current date/time as Day.js instance
 * 
 * @returns {dayjs.Dayjs} Current date/time
 * 
 * @example
 * today() // Day.js instance for current date/time
 */
export function today() {
  return dayjs()
}

/**
 * Convert date to UTC
 * 
 * @param {Date|string|number} date - Date to convert
 * @returns {dayjs.Dayjs} Day.js instance in UTC
 * 
 * @example
 * toUtc(new Date()) // Day.js instance in UTC
 */
export function toUtc(date) {
  return dayjs(date).utc()
}

/**
 * Format date for display in data tables
 * Provides user-friendly formatting with fallback for invalid dates
 * 
 * @param {Date|string|number} date - Date to format
 * @param {string} [format='display'] - Format to use
 * @returns {string} Formatted date string or empty string
 * 
 * @example
 * formatTableDate(Date.now()) // "Feb 10, 2026"
 * formatTableDate('2026-02-10T14:30:00') // "Feb 10, 2026"
 */
export function formatTableDate(date, format = 'display') {
  if (!date) return ''
  
  const dayjsDate = dayjs(date)
  
  if (!dayjsDate.isValid()) {
    return ''
  }
  
  const formatString = formatters[format] || format
  return dayjsDate.format(formatString)
}

/**
 * Get current year (useful for copyright notices)
 * 
 * @returns {number} Current year
 * 
 * @example
 * getCurrentYear() // 2026
 */
export function getCurrentYear() {
  return dayjs().year()
}

/**
 * Compare two dates
 * 
 * @param {Date|string|number} date1 - First date
 * @param {Date|string|number} date2 - Second date
 * @returns {number} -1 if date1 < date2, 0 if equal, 1 if date1 > date2
 * 
 * @example
 * compareDates('2026-02-10', '2026-02-11') // -1
 * compareDates('2026-02-10', '2026-02-10') // 0
 * compareDates('2026-02-11', '2026-02-10') // 1
 */
export function compareDates(date1, date2) {
  const d1 = dayjs(date1)
  const d2 = dayjs(date2)
  
  if (!d1.isValid() || !d2.isValid()) {
    console.warn('[date.js] Invalid date(s) provided for comparison')
    return 0
  }
  
  if (d1.isBefore(d2)) return -1
  if (d1.isAfter(d2)) return 1
  return 0
}

/**
 * Add time to a date
 * 
 * @param {Date|string|number} date - Base date
 * @param {number} amount - Amount to add
 * @param {string} unit - Unit of time ('day', 'week', 'month', 'year', 'hour', 'minute', 'second')
 * @returns {dayjs.Dayjs} Day.js instance with added time
 * 
 * @example
 * addTime(new Date(), 1, 'day') // Tomorrow
 * addTime('2026-02-10', 2, 'week') // Two weeks from Feb 10
 */
export function addTime(date, amount, unit) {
  return dayjs(date).add(amount, unit)
}

/**
 * Subtract time from a date
 * 
 * @param {Date|string|number} date - Base date
 * @param {number} amount - Amount to subtract
 * @param {string} unit - Unit of time ('day', 'week', 'month', 'year', 'hour', 'minute', 'second')
 * @returns {dayjs.Dayjs} Day.js instance with subtracted time
 * 
 * @example
 * subtractTime(new Date(), 1, 'day') // Yesterday
 * subtractTime('2026-02-10', 1, 'month') // Jan 10, 2026
 */
export function subtractTime(date, amount, unit) {
  return dayjs(date).subtract(amount, unit)
}

// Export dayjs instance for advanced usage
export default dayjs

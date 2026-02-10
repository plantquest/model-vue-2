/**
 * Date Utility Tests
 * 
 * Comprehensive tests for the Day.js-based date utility module
 * Target: >80% code coverage
 */

import { describe, it, expect, beforeEach, vi } from 'vitest'
import dayjs from 'dayjs'
import {
  formatDate,
  relativeTime,
  parseDate,
  isValidDate,
  now,
  today,
  toUtc,
  formatTableDate,
  getCurrentYear,
  compareDates,
  addTime,
  subtractTime,
  formatters
} from '../../utils/date'

describe('Date Utility Module', () => {
  describe('formatters', () => {
    it('should export standard format constants', () => {
      expect(formatters).toBeDefined()
      expect(formatters.iso).toBe('YYYY-MM-DDTHH:mm:ss')
      expect(formatters.isoDate).toBe('YYYY-MM-DD')
      expect(formatters.standard).toBe('YYYY-MM-DD')
      expect(formatters.display).toBe('MMM D, YYYY')
      expect(formatters.full).toBe('MMMM D, YYYY h:mm A')
      expect(formatters.time).toBe('h:mm A')
      expect(formatters.time24).toBe('HH:mm')
    })
  })

  describe('formatDate()', () => {
    it('should format dates with predefined formatters', () => {
      const date = new Date('2026-02-10T14:30:00')
      
      expect(formatDate(date, 'standard')).toBe('2026-02-10')
      expect(formatDate(date, 'display')).toBe('Feb 10, 2026')
      expect(formatDate(date, 'isoDate')).toBe('2026-02-10')
    })

    it('should use display format as default', () => {
      const date = new Date('2026-02-10')
      expect(formatDate(date)).toBe('Feb 10, 2026')
    })

    it('should accept custom format strings', () => {
      const date = new Date('2026-02-10T14:30:00')
      expect(formatDate(date, 'YYYY-MM-DD HH:mm')).toBe('2026-02-10 14:30')
      expect(formatDate(date, 'MMM DD, YYYY')).toBe('Feb 10, 2026')
    })

    it('should handle string date inputs', () => {
      expect(formatDate('2026-02-10', 'standard')).toBe('2026-02-10')
      expect(formatDate('2026-02-10T14:30:00', 'display')).toBe('Feb 10, 2026')
    })

    it('should handle timestamp inputs', () => {
      const timestamp = new Date('2026-02-10').getTime()
      expect(formatDate(timestamp, 'standard')).toBe('2026-02-10')
    })

    it('should return empty string for null/undefined', () => {
      expect(formatDate(null)).toBe('')
      expect(formatDate(undefined)).toBe('')
    })

    it('should return empty string for invalid dates', () => {
      expect(formatDate('invalid-date')).toBe('')
      expect(formatDate('not a date')).toBe('')
    })

    it('should log warning for invalid dates', () => {
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
      
      formatDate('invalid-date')
      
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        '[date.js] Invalid date provided:',
        'invalid-date'
      )
      
      consoleWarnSpy.mockRestore()
    })
  })

  describe('relativeTime()', () => {
    it('should return relative time from now', () => {
      const yesterday = dayjs().subtract(1, 'day').toDate()
      const result = relativeTime(yesterday)
      expect(result).toBe('a day ago')
    })

    it('should return relative time for future dates', () => {
      const tomorrow = dayjs().add(1, 'day').toDate()
      const result = relativeTime(tomorrow)
      expect(result).toBe('in a day')
    })

    it('should handle hours', () => {
      const twoHoursAgo = dayjs().subtract(2, 'hour').toDate()
      const result = relativeTime(twoHoursAgo)
      expect(result).toBe('2 hours ago')
    })

    it('should handle minutes', () => {
      const fiveMinutesAgo = dayjs().subtract(5, 'minute').toDate()
      const result = relativeTime(fiveMinutesAgo)
      expect(result).toBe('5 minutes ago')
    })

    it('should accept custom base date', () => {
      const date1 = '2026-02-10'
      const date2 = '2026-02-09'
      const result = relativeTime(date2, date1)
      expect(result).toBe('a day ago')
    })

    it('should return empty string for null/undefined', () => {
      expect(relativeTime(null)).toBe('')
      expect(relativeTime(undefined)).toBe('')
    })

    it('should return empty string for invalid dates', () => {
      expect(relativeTime('invalid-date')).toBe('')
    })

    it('should log warning for invalid dates', () => {
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
      
      relativeTime('invalid-date')
      
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        '[date.js] Invalid date provided:',
        'invalid-date'
      )
      
      consoleWarnSpy.mockRestore()
    })
  })

  describe('parseDate()', () => {
    it('should parse date with custom format', () => {
      const parsed = parseDate('02/10/2026', 'MM/DD/YYYY')
      expect(parsed.isValid()).toBe(true)
      expect(parsed.format('YYYY-MM-DD')).toBe('2026-02-10')
    })

    it('should parse ISO format dates', () => {
      const parsed = parseDate('2026-02-10', 'YYYY-MM-DD')
      expect(parsed.isValid()).toBe(true)
      expect(parsed.format('YYYY-MM-DD')).toBe('2026-02-10')
    })

    it('should handle strict parsing', () => {
      const parsed = parseDate('2026-02-10', 'YYYY-MM-DD', true)
      expect(parsed.isValid()).toBe(true)
    })

    it('should return invalid Day.js instance for bad format', () => {
      const parsed = parseDate('invalid', 'YYYY-MM-DD')
      expect(parsed.isValid()).toBe(false)
    })
  })

  describe('isValidDate()', () => {
    it('should return true for valid dates', () => {
      expect(isValidDate(new Date())).toBe(true)
      expect(isValidDate('2026-02-10')).toBe(true)
      expect(isValidDate(Date.now())).toBe(true)
    })

    it('should return false for invalid dates', () => {
      expect(isValidDate('invalid-date')).toBe(false)
      expect(isValidDate('not a date')).toBe(false)
    })

    it('should return false for null/undefined', () => {
      expect(isValidDate(null)).toBe(false)
      expect(isValidDate(undefined)).toBe(false)
    })

    it('should return false for empty string', () => {
      expect(isValidDate('')).toBe(false)
    })
  })

  describe('now()', () => {
    it('should return current timestamp', () => {
      const before = Date.now()
      const result = now()
      const after = Date.now()
      
      expect(result).toBeGreaterThanOrEqual(before)
      expect(result).toBeLessThanOrEqual(after)
    })

    it('should return a number', () => {
      expect(typeof now()).toBe('number')
    })
  })

  describe('today()', () => {
    it('should return current date as Day.js instance', () => {
      const result = today()
      expect(dayjs.isDayjs(result)).toBe(true)
    })

    it('should return valid date', () => {
      const result = today()
      expect(result.isValid()).toBe(true)
    })
  })

  describe('toUtc()', () => {
    it('should convert date to UTC', () => {
      const date = new Date('2026-02-10T14:30:00')
      const utcDate = toUtc(date)
      
      expect(dayjs.isDayjs(utcDate)).toBe(true)
      expect(utcDate.isValid()).toBe(true)
    })

    it('should handle string dates', () => {
      const utcDate = toUtc('2026-02-10')
      expect(utcDate.isValid()).toBe(true)
    })
  })

  describe('formatTableDate()', () => {
    it('should format dates for table display', () => {
      const date = new Date('2026-02-10T14:30:00')
      expect(formatTableDate(date)).toBe('Feb 10, 2026')
    })

    it('should use display format as default', () => {
      const date = new Date('2026-02-10')
      expect(formatTableDate(date)).toBe('Feb 10, 2026')
    })

    it('should accept custom format', () => {
      const date = new Date('2026-02-10')
      expect(formatTableDate(date, 'standard')).toBe('2026-02-10')
      expect(formatTableDate(date, 'full')).toContain('February 10, 2026')
    })

    it('should return empty string for null/undefined', () => {
      expect(formatTableDate(null)).toBe('')
      expect(formatTableDate(undefined)).toBe('')
    })

    it('should return empty string for invalid dates', () => {
      expect(formatTableDate('invalid-date')).toBe('')
    })

    it('should handle timestamps', () => {
      const timestamp = new Date('2026-02-10').getTime()
      expect(formatTableDate(timestamp)).toBe('Feb 10, 2026')
    })
  })

  describe('getCurrentYear()', () => {
    it('should return current year', () => {
      const currentYear = new Date().getFullYear()
      expect(getCurrentYear()).toBe(currentYear)
    })

    it('should return a number', () => {
      expect(typeof getCurrentYear()).toBe('number')
    })

    it('should be 4 digits', () => {
      const year = getCurrentYear()
      expect(year).toBeGreaterThanOrEqual(2024)
      expect(year).toBeLessThan(2100)
    })
  })

  describe('compareDates()', () => {
    it('should return -1 when date1 is before date2', () => {
      expect(compareDates('2026-02-09', '2026-02-10')).toBe(-1)
    })

    it('should return 0 when dates are equal', () => {
      expect(compareDates('2026-02-10', '2026-02-10')).toBe(0)
    })

    it('should return 1 when date1 is after date2', () => {
      expect(compareDates('2026-02-11', '2026-02-10')).toBe(1)
    })

    it('should handle Date objects', () => {
      const date1 = new Date('2026-02-09')
      const date2 = new Date('2026-02-10')
      expect(compareDates(date1, date2)).toBe(-1)
    })

    it('should handle timestamps', () => {
      const timestamp1 = new Date('2026-02-09').getTime()
      const timestamp2 = new Date('2026-02-10').getTime()
      expect(compareDates(timestamp1, timestamp2)).toBe(-1)
    })

    it('should return 0 for invalid dates', () => {
      expect(compareDates('invalid', '2026-02-10')).toBe(0)
      expect(compareDates('2026-02-10', 'invalid')).toBe(0)
    })

    it('should log warning for invalid dates', () => {
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
      
      compareDates('invalid', '2026-02-10')
      
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        '[date.js] Invalid date(s) provided for comparison'
      )
      
      consoleWarnSpy.mockRestore()
    })
  })

  describe('addTime()', () => {
    it('should add days to date', () => {
      const date = '2026-02-10'
      const result = addTime(date, 1, 'day')
      expect(result.format('YYYY-MM-DD')).toBe('2026-02-11')
    })

    it('should add weeks to date', () => {
      const date = '2026-02-10'
      const result = addTime(date, 2, 'week')
      expect(result.format('YYYY-MM-DD')).toBe('2026-02-24')
    })

    it('should add months to date', () => {
      const date = '2026-02-10'
      const result = addTime(date, 1, 'month')
      expect(result.format('YYYY-MM-DD')).toBe('2026-03-10')
    })

    it('should add years to date', () => {
      const date = '2026-02-10'
      const result = addTime(date, 1, 'year')
      expect(result.format('YYYY-MM-DD')).toBe('2027-02-10')
    })

    it('should add hours to date', () => {
      const date = '2026-02-10T14:00:00'
      const result = addTime(date, 2, 'hour')
      expect(result.format('YYYY-MM-DD HH:mm')).toBe('2026-02-10 16:00')
    })

    it('should add minutes to date', () => {
      const date = '2026-02-10T14:30:00'
      const result = addTime(date, 15, 'minute')
      expect(result.format('HH:mm')).toBe('14:45')
    })

    it('should return Day.js instance', () => {
      const result = addTime('2026-02-10', 1, 'day')
      expect(dayjs.isDayjs(result)).toBe(true)
    })
  })

  describe('subtractTime()', () => {
    it('should subtract days from date', () => {
      const date = '2026-02-10'
      const result = subtractTime(date, 1, 'day')
      expect(result.format('YYYY-MM-DD')).toBe('2026-02-09')
    })

    it('should subtract weeks from date', () => {
      const date = '2026-02-24'
      const result = subtractTime(date, 2, 'week')
      expect(result.format('YYYY-MM-DD')).toBe('2026-02-10')
    })

    it('should subtract months from date', () => {
      const date = '2026-03-10'
      const result = subtractTime(date, 1, 'month')
      expect(result.format('YYYY-MM-DD')).toBe('2026-02-10')
    })

    it('should subtract years from date', () => {
      const date = '2027-02-10'
      const result = subtractTime(date, 1, 'year')
      expect(result.format('YYYY-MM-DD')).toBe('2026-02-10')
    })

    it('should subtract hours from date', () => {
      const date = '2026-02-10T14:00:00'
      const result = subtractTime(date, 2, 'hour')
      expect(result.format('YYYY-MM-DD HH:mm')).toBe('2026-02-10 12:00')
    })

    it('should subtract minutes from date', () => {
      const date = '2026-02-10T14:30:00'
      const result = subtractTime(date, 15, 'minute')
      expect(result.format('HH:mm')).toBe('14:15')
    })

    it('should return Day.js instance', () => {
      const result = subtractTime('2026-02-10', 1, 'day')
      expect(dayjs.isDayjs(result)).toBe(true)
    })
  })

  describe('Edge Cases', () => {
    it('should handle leap year dates', () => {
      expect(formatDate('2024-02-29', 'standard')).toBe('2024-02-29')
      expect(isValidDate('2024-02-29')).toBe(true)
    })

    it('should handle end of month transitions', () => {
      const date = '2026-01-31'
      const result = addTime(date, 1, 'month')
      // Day.js handles this by moving to last valid day of next month
      expect(result.format('YYYY-MM-DD')).toBe('2026-02-28')
    })

    it('should handle timezone differences', () => {
      const date = new Date('2026-02-10T23:30:00')
      const utcDate = toUtc(date)
      expect(utcDate.isValid()).toBe(true)
    })

    it('should handle very old dates', () => {
      expect(formatDate('1900-01-01', 'standard')).toBe('1900-01-01')
      expect(isValidDate('1900-01-01')).toBe(true)
    })

    it('should handle far future dates', () => {
      expect(formatDate('2100-12-31', 'standard')).toBe('2100-12-31')
      expect(isValidDate('2100-12-31')).toBe(true)
    })
  })

  describe('Integration Tests', () => {
    it('should work with chained operations', () => {
      const date = '2026-02-10'
      const future = addTime(date, 1, 'week')
      const formatted = formatDate(future, 'display')
      expect(formatted).toBe('Feb 17, 2026')
    })

    it('should parse and format consistently', () => {
      const original = '02/10/2026'
      const parsed = parseDate(original, 'MM/DD/YYYY')
      const formatted = formatDate(parsed.toDate(), 'standard')
      expect(formatted).toBe('2026-02-10')
    })

    it('should handle table display workflow', () => {
      const timestamp = Date.now()
      const formatted = formatTableDate(timestamp)
      expect(formatted).toBeTruthy()
      expect(typeof formatted).toBe('string')
    })
  })
})

/**
 * Determine if a value is a URLSearchParams object
 * @see https://github.com/axios/axios/blob/master/lib/utils.js#L177-L179
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
export function isURLSearchParams(val: any) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams
}

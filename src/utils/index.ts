export { isObjectLike } from './isObjectLike'

/**
 * Determine if a value is an empty Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an empty Object, otherwise false
 */
export function isEmptyObject(val: any): boolean {
  if (val == null) {
    return true
  }

  for (const key in val) {
    if (Object.prototype.hasOwnProperty.call(val, key)) {
      return false
    }
  }

  return true
}

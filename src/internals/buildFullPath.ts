import { isAbsoluteURL } from '../helpers/isAbsoluteURL'
import { combineURLs } from '../helpers/combineURLs'

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 * @see https://github.com/axios/axios/blob/master/lib/core/buildFullPath.js#L15-L20
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
export function buildFullPath(baseURL: string, requestedURL: string) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL)
  }
  return requestedURL
}

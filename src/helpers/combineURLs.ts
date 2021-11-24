/**
 * Creates a new URL by combining the specified URLs
 * @see https://github.com/axios/axios/blob/master/lib/helpers/combineURLs.js#L10-L14
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
export function combineURLs(baseURL: string, relativeURL: string) {
  return relativeURL ? `${baseURL.replace(/\/+$/, '')}/${relativeURL.replace(/^\/+/, '')}` : baseURL
}

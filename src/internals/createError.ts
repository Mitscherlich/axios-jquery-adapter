import { enhanceError } from './enhanceError'

/**
 * Create an Error with the specified message, config, error code, request and response.
 * @see https://github.com/axios/axios/blob/master/lib/core/createError.js#L15-L18
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
export function createError(message, config, code, request, response) {
  const error = new Error(message)
  return enhanceError(error, config, code, request, response)
}

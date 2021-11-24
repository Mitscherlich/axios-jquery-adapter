import { AxiosRequestConfig, AxiosResponse } from 'axios'

import { createError } from './createError'

/**
 * Resolve or reject a Promise based on response status.
 * @see https://github.com/axios/axios/blob/master/lib/core/settle.js#L12-L25
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {AxiosResponse} response The response.
 * @param {AxiosRequestConfig} config The request config.
 */
export function settle(
  resolve: Function,
  reject: Function,
  response: AxiosResponse,
  config: AxiosRequestConfig
) {
  const { validateStatus } = config

  if (!response.status || !validateStatus || validateStatus(response.status)) {
    return resolve(response)
  }

  reject(
    createError(
      `Request failed with status code ${response.status}`,
      config,
      null,
      response.request,
      response
    )
  )
}

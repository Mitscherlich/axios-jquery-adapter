import { AxiosRequestConfig, AxiosResponse } from 'axios'

import { createError } from './createError'

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

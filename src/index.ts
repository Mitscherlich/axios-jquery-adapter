import { ajax as request } from 'jquery'
import { AxiosAdapter, AxiosResponse, Cancel, Method } from 'axios'
import * as MIME_TYPES from './internals/mimeTypes'
import { isEmptyObject } from './utils'
import { isObjectLike } from './utils/isObjectLike'
import { settle } from './internals/settle'
import { buildFullPath } from './internals/buildFullPath'
import { buildURL } from './helpers/buildURL'

const jqueryAdapter: AxiosAdapter = (config) => {
  let method: Method = config.method

  if (!method) {
    method = 'GET'
  }

  // keep method in upper case
  method = method.toUpperCase() as Method

  let payload: any = config.data

  const contentType: string | undefined = extractRequestHeader(
    config.headers,
    // for jQuery.ajax
    'ContentType',
    // for raw XMLHttpRequest
    'Content-Type',
    // for Axios
    'content-type'
  )

  if (contentType === MIME_TYPES.CONTENT_TYPE_JSON && isObjectLike(payload)) {
    payload = JSON.stringify(payload)
  }

  let dataType = 'json'

  if (config.responseType === 'json' || config.responseType === 'text') {
    dataType = config.responseType
  } else if (config.responseType === 'document') {
    dataType = 'html'
  } else if (
    config.responseType === 'arraybuffer' ||
    config.responseType === 'blob' ||
    config.responseType === 'stream'
  ) {
    dataType = undefined
  }

  let processData

  if (contentType === MIME_TYPES.CONTENT_TYPE_FORM_DATA) {
    processData = false // tell jquery.ajax not to transform `FormData`
  }

  return new Promise((resolve, reject) => {
    const jqXHR = request({
      url: buildURL(
        buildFullPath(config.baseURL, config.url),
        config.params,
        config.paramsSerializer
      ),
      method,
      async: true, // axios request always asynchronous
      data: payload,
      dataType,
      headers: config.headers,
      timeout: config.timeout,
      contentType,
      processData,
      complete: onComplete,
    })

    if (config.cancelToken) {
      // handle cancellation
      config.cancelToken.promise.then(onCanceled)
    }

    function onComplete(jqXHR: JQueryXHR) {
      const response: AxiosResponse = {
        status: jqXHR.status,
        statusText: jqXHR.statusText,
        data: jqXHR.responseJSON ?? jqXHR.responseXML ?? jqXHR.responseText,
        headers: transformResponseHeaders(jqXHR.getAllResponseHeaders()),
        request: jqXHR,
        config,
      }

      settle(resolve, reject, response, config)
    }

    function onCanceled(cancel: Cancel) {
      if (jqXHR.readyState == 0 && jqXHR.statusText === 'abort') {
        return // already canceled
      }

      jqXHR.abort('abort') // pass plain string 'abort' to make sure `jqXHR.statusText` always been 'abort'

      reject(cancel)
    }
  })

  function extractRequestHeader<T>(
    headers: Record<string, unknown>,
    ...keys: string[]
  ): T | undefined {
    if (!headers || isEmptyObject(headers)) {
      return
    }

    for (let i = 0, total = keys.length; i < total; i++) {
      const key = keys[i]
      if (key in headers) {
        return headers[key] as T
      }
    }
  }

  function transformResponseHeaders(raw: string) {
    const headers = {}

    raw.split(/\r?\n/g).forEach((header: string) => {
      const [name, value] = header.split(': ')
      headers[name] = value
    })

    return headers
  }
}

export default jqueryAdapter

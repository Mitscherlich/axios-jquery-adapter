import { isURLSearchParams, isArray, isDate, isObject, forEach } from '../utils'

function encode(val) {
  return encodeURIComponent(val)
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
export function buildURL(
  url: string,
  params: Record<string, unknown>,
  paramsSerializer?: Function
) {
  if (!params) {
    return url
  }

  let serializedParams
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params)
  } else if (isURLSearchParams(params)) {
    serializedParams = params.toString()
  } else {
    const parts = []

    forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return
      }

      if (isArray(val)) {
        key = key + '[]'
      } else {
        val = [val]
      }

      forEach(val as Array<unknown>, function parseValue(v) {
        if (isDate(v)) {
          v = v.toISOString()
        } else if (isObject(v)) {
          v = JSON.stringify(v)
        }
        parts.push(`${encode(key)}=${encode(v)}`)
      })
    })

    serializedParams = parts.join('&')
  }

  if (serializedParams) {
    const hashmarkIndex = url.indexOf('#')
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex)
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }

  return url
}

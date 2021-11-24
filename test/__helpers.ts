import jquery from 'jquery'

const AJAX = jest.spyOn(jquery, 'ajax')

let attempts = 0
const MAX_ATTEMPTS = 5
const ATTEMPTY_DELAY_FACTOR = 5

export function getAjaxRequest() {
  return new Promise<JQueryAjaxSettings>((resolve, reject) => {
    attempts = 0
    attemptGettingAjaxRequest(resolve, reject)
  })
}

function attemptGettingAjaxRequest(resolve: Function, reject: Function) {
  const delay = attempts * attempts * ATTEMPTY_DELAY_FACTOR

  if (attempts++ > MAX_ATTEMPTS) {
    reject(new Error('No request was found'))
    return
  }

  setTimeout(() => {
    const [request] = mostRecentCall<JQueryStatic, 'ajax'>(AJAX)
    if (request) {
      resolve(request)
    } else {
      attemptGettingAjaxRequest(resolve, reject)
    }
  }, delay)
}

type SypInstance<
  T extends {},
  M extends jest.FunctionPropertyNames<Required<T>>
> = Required<T>[M] extends (...args: any[]) => any
  ? jest.SpyInstance<ReturnType<Required<T>[M]>, jest.ArgsType<Required<T>[M]>>
  : never

function mostRecentCall<T extends {}, M extends jest.FunctionPropertyNames<Required<T>>>(
  mockFn?: SypInstance<T, M>
): jest.ArgsType<Required<T>[M]> | undefined {
  const total = mockFn ? mockFn.mock.calls.length : 0
  return total ? mockFn.mock.calls[total - 1] : undefined
}

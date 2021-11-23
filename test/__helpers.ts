let attempts = 0
const MAX_ATTEMPTS = 5
const ATTEMPTY_DELAY_FACTOR = 5

export function getAjaxRequest<T>(spy: jest.SpyInstance<T>) {
  return new Promise((resolve, reject) => {
    attempts = 0
    attemptGettingAjaxRequest<T>(spy, resolve, reject)
  })
}

function attemptGettingAjaxRequest<T>(
  spy: jest.SpyInstance<T>,
  resolve: (value: any) => void,
  reject: (reason?: any) => void
) {
  const delay = attempts * attempts * ATTEMPTY_DELAY_FACTOR

  if (attempts++ > MAX_ATTEMPTS) {
    reject(new Error('No request was found'))
    return
  }

  setTimeout(() => {
    let request = spy.mock.calls[0]
    if (request) {
      resolve(request)
    } else {
      attemptGettingAjaxRequest(spy, resolve, reject)
    }
  }, delay)
}

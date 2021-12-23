import jqueryAdapter from '../..'

describe('static', () => {
  it('should be a function', () => {
    expect(typeof jqueryAdapter).toEqual('function')
  })

  it('should take one parameter ', () => {
    expect(jqueryAdapter.length).toEqual(1)
  })
})

describe('runtime', () => {
  it('should throw an error if called with no parameter', () => {
    expect(jqueryAdapter).toThrow()
  })

  it('should return a promise', () => {
    const promise = jqueryAdapter({})

    expect(typeof promise.then).toEqual('function')
    expect(typeof promise.catch).toEqual('function')
  })
})

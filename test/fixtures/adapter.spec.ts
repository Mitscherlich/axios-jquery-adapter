import jqueryAdapter from '../..'

describe('adapter', () => {
  it('should be a function', () => {
    expect(typeof jqueryAdapter).toEqual('function')
  })

  it('should take on parameter ', () => {
    expect(jqueryAdapter.length).toEqual(1)
  })

  it('should return a promise', () => {
    const promise = jqueryAdapter({})

    expect(typeof promise.then).toEqual('function')
    expect(typeof promise.catch).toEqual('function')
  })
})

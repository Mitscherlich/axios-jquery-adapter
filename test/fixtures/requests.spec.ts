import axios from 'axios'
import jquery from 'jquery'
import jqueryAdapter from '../..'

describe('requests', () => {
  let originalAdapter = axios.defaults.adapter

  beforeEach(() => {
    axios.defaults.adapter = jqueryAdapter
  })

  afterEach(() => {
    axios.defaults.adapter = originalAdapter
  })

  it('should make a jquery.ajax request', () => {
    const spy = jest.spyOn(jquery, 'ajax')

    axios('/foo')

    expect(spy).toBeCalledWith({
      url: '/foo',
      method: 'GET',
      async: true,
      data: undefined,
      dataType: 'json',
      headers: expect.any(Object),
      timeout: expect.any(Number),
      contentType: undefined,
      processData: undefined,
      complete: expect.any(Function),
    })
  })
})

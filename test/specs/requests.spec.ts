import axios from 'axios'
import jquery from 'jquery'
import jqueryAdapter from '../..'
import { getAjaxRequest } from '../__helpers'

describe('requests', () => {
  it('should make a jquery.ajax request', (done) => {
    const spyOnAjax = jest.spyOn(jquery, 'ajax')

    axios('/foo', {
      adapter: jqueryAdapter,
    })

    getAjaxRequest().then(() => {
      expect(spyOnAjax).toHaveBeenCalled()
      done()
    })
  })

  it('should transform JSON to string', (done) => {
    const data = { foo: 'bar' }

    axios.post('/foo', data, {
      adapter: jqueryAdapter,
    })

    getAjaxRequest().then((request) => {
      expect(request.data).toEqual('{"foo":"bar"}')
      done()
    })
  })

  // it('should send data as encoded url if request content-type is application/x-www-form-urlencoded', (done) => {
  //   const params = { foo: 'bar', baz: [1, 2, 3] }

  //   axios('/foo', {
  //     params,
  //     headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  //     adapter: jqueryAdapter,
  //   })

  //   getAjaxRequest().then((request) => {
  //     expect(request.url).toEqual('/foo?foo=bar&baz[]=1&baz[]=2&baz[]=3')
  //     done()
  //   })
  // })

  // it('should pass mutating headers', (done) => {
  //   const token = Math.floor(Math.random() * Math.pow(2, 64)).toString(36)

  //   axios('foo', {
  //     headers: { 'X-Authorization': token },
  //     adapter: jqueryAdapter,
  //   })

  //   getAjaxRequest().then((request) => {
  //     expect(request.headers['X-Authorization']).toEqual(token)
  //     done()
  //   })
  // })
})

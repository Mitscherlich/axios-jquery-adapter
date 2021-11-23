import axios from 'axios'
import jquery from 'jquery'
import jqueryAdapter from '../..'
import { getAjaxRequest } from '../__helpers'

const Cancel = axios.Cancel
const CancelToken = axios.CancelToken

describe('cancel', () => {
  let originalAdapter = axios.defaults.adapter

  beforeEach(() => {
    axios.defaults.adapter = jqueryAdapter
  })

  afterEach(() => {
    axios.defaults.adapter = originalAdapter
  })

  describe('when called before send request', () => {
    it('rejects Promise with a Cancel object', (done) => {
      const source = CancelToken.source()

      source.cancel('Operation has been canceled.')

      axios.get('/foo', { cancelToken: source.token }).catch((thrown) => {
        expect(thrown).toEqual(expect.any(Cancel))
        expect(thrown.message).toBe('Operation has been canceled.')
        done()
      })
    })
  })

  describe('when called after request has been send', () => {
    it('rejects Promise with a Cancel object', (done) => {
      const spy = jest.spyOn(jquery, 'ajax')
      const source = CancelToken.source()

      axios.get('/foo', { cancelToken: source.token }).catch((thrown) => {
        expect(thrown).toBeInstanceOf(Cancel)
        expect(thrown.message).toBe('Operation has been canceled.')
        done()
      })

      getAjaxRequest(spy).then(() => {
        // call cancel() when the request has been sent, but a response has not been received
        source.cancel('Operation has been canceled.')
      })
    })
  })
})

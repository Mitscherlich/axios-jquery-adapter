import axios from 'axios'
import jqueryAdapter from '../..'
import { getAjaxRequest } from '../__helpers'

const Cancel = axios.Cancel
const CancelToken = axios.CancelToken

describe('cancel', () => {
  describe('when called before send request', () => {
    it('rejects Promise with a Cancel object', (done) => {
      const source = CancelToken.source()

      source.cancel('Operation has been canceled.')

      axios('/foo', {
        cancelToken: source.token,
        adapter: jqueryAdapter,
      }).catch((thrown) => {
        expect(thrown).toEqual(expect.any(Cancel))
        expect(thrown.message).toBe('Operation has been canceled.')
        done()
      })
    })
  })

  describe('when called after request has been send', () => {
    it('rejects Promise with a Cancel object', (done) => {
      const source = CancelToken.source()

      axios('/foo', {
        cancelToken: source.token,
        adapter: jqueryAdapter,
      }).catch((thrown) => {
        expect(thrown).toBeInstanceOf(Cancel)
        expect(thrown.message).toBe('Operation has been canceled.')
        done()
      })

      getAjaxRequest().then(() => {
        // call cancel() when the request has been sent, but a response has not been received
        source.cancel('Operation has been canceled.')
      })
    })
  })
})

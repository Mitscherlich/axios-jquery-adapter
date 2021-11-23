import axios from 'axios'
import jqueryAdapter from '../..'

describe('Test cancel token', () => {
  const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
    adapter: jqueryAdapter,
  })

  it('should be canceled by cancel token', async () => {
    const source = axios.CancelToken.source()

    // cancel this request after 1s
    setTimeout(() => {
      source.cancel('test cancel')
    }, 1_000)

    // tell server sleep for 5s to simulate long task
    try {
      await axiosInstance.put(`/sleep/${5_000}`, null, { cancelToken: source.token })
    } catch (e) {
      expect(e.message).toEqual('test cancel')
    }
  }, 6_000 /* 6s = 5s + 1s */)
})

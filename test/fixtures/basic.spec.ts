import axios from 'axios'
import jqueryAdapter from '../..'

describe('Basic usages', () => {
  const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
    adapter: jqueryAdapter,
  })

  axiosInstance.interceptors.request.use((config) => {
    if (config.headers['Content-Type'] === 'multipart/form-data') {
      const keys = Object.keys(config.data)
      const formData = new FormData()

      keys.forEach((key) => {
        formData.append(key, config.data[key])
      })

      config.data = formData
    }

    return config
  })

  test('should get response return ok', async () => {
    const response = await axiosInstance.get(`/echo/${encodeURIComponent('hello world')}`)

    expect(response.status).toBe(200)
    expect(response.data).toEqual('hello world')
  })

  test('should get with urlencoded paramters response return ok', async () => {
    const response = await axiosInstance.get('/echo', {
      params: { content: 'hello world' },
    })

    expect(response.status).toBe(200)
    expect(response.data).toEqual('hello world')
  })

  test('should post json response ok', async () => {
    const payload = { name: 'foo' }

    const response = await axiosInstance.post('/echo', payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    expect(response.status).toBe(200)
    expect(response.data).toEqual(payload)
  })

  test('should post form-data response ok', async () => {
    const payload = { name: 'foo' }

    const response = await axiosInstance.post('/echo', payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    expect(response.status).toBe(200)
    expect(response.data).toEqual(payload)
  })
})

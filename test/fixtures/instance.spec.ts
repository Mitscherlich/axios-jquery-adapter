import axios from 'axios'
import jqueryAdapter from '../..'

describe('instance', () => {
  let originalAdapter = axios.defaults.adapter

  beforeEach(() => {
    axios.defaults.adapter = jqueryAdapter
  })

  afterEach(() => {
    axios.defaults.adapter = originalAdapter
  })

  it('should have same adapter as default instance', () => {
    const instance = axios.create()

    expect(instance.defaults.adapter).toEqual(axios.defaults.adapter)
  })
})

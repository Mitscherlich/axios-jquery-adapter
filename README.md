# axios-jquery-adapter

Axios adapter for `jquery.ajax`

## Quick start

Install via [npm](http://npmjs.org/) or [yarn](https://yarnpkg.com/) or [pnpm](https://pnpm.io/)

```sh
$ npm i --save axios axios-jquery-adapter
# or yarn
$ yarn add axios axios-jquery-adapter
# or pnpm
$ pnpm add axios axios-jquery-adapter
```

## Example

1. make an `application/json` request:

```js
import $ from 'jquery'
import axios from 'axios'
import jqueryAdapter from 'axios-jquery-adapter'

export const axiosJson = axios.create({
  headers: {
    Accept: 'application/json',
  },
  adapter: jqueryAdapter,
})

axiosJson.get('/api/user/list')

$(document).ajaxComplete(function onComplete(event, jqXHR, settings) {
  console.log(settings.url) // ==> /api/user/list
})
```

2. post a request with `FormData`:

```js
import $ from 'jquery'
import axios from 'axios'
import jqueryAdapter from 'axios-jquery-adapter'

export const axiosFormData = axios.create({
  headers: {
    Accept: 'application/json',
    // this will tell jquery.ajax to send request with `processData: false`
    ContentType: 'multipart/form-data',
  },
  adapter: jqueryAdapter,
})

axiosFormData.interceptors.request.use((config) => {
  if (config.method.toUpperCase() === 'POST' && config.data != null) {
    const formData = new FormData()

    Object.keys(config.data).forEach((key) => {
      formData.append(key, config.data[key])
    })

    config.data = formData
  }

  return config
})
```

## License

[MIT](LICENSE)

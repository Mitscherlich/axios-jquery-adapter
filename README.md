# axios-jquery-adapter

Axios adapter for `jquery.ajax`

## Quick start

Install via [npm](http://npmjs.org/) or [yarn](https://yarnpkg.com/) or [pnpm](https://pnpm.io/)

```sh
$ npm i --save axios-jquery-adapter
# or yarn
$ yarn add axios-jquery-adapter
# or pnpm
$ pnpm add axios-jquery-adapter
```

## Example

1. make an `application/json` request:

```js
import $ from 'jquery'
import axios from 'axios'
import jqueryAdapter from 'axios-jquery-adapter'

export const axiosJson = axios.create({
  adapter: jqueryAdapter,
})

axiosJson.get('/api/user/list')

$(document).ajaxComplete(function onComplete(event, jqXHR, settings) {
  console.log(settings.url) // ==> /api/user/list
})
```

## License

[MIT](LICENSE)

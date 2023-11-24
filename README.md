# remark-mdx-images

[![github actions](https://github.com/remcohaszing/remark-mdx-images/actions/workflows/ci.yaml/badge.svg)](https://github.com/remcohaszing/remark-mdx-images/actions/workflows/ci.yaml)
[![codecov](https://codecov.io/gh/remcohaszing/remark-mdx-images/branch/main/graph/badge.svg)](https://codecov.io/gh/remcohaszing/remark-mdx-images)
[![npm version](https://img.shields.io/npm/v/remark-mdx-images)](https://www.npmjs.com/package/remark-mdx-images)
[![npm downloads](https://img.shields.io/npm/dm/remark-mdx-images)](https://www.npmjs.com/package/remark-mdx-images)

A [remark](https://remark.js.org) plugin for changing image sources to JavaScript imports using MDX

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
  - [Options](#options)
    - [`resolve`](#resolve)
- [Compatibility](#compatibility)
- [License](#license)

## Installation

```sh
npm install remark-mdx-images
```

## Usage

This remark plugin takes markdown images, and converts them into mdx elements `<img />` that use
JavaScript imports to resolve the image source.

For example, given a file named `example.mdx` with the following contents:

```mdx
![Very cute kittens](./kittens.png 'Meow!')
```

The following script:

```js
import { readFile } from 'node:fs/promises'

import { compile } from '@mdx-js/mdx'
import remarkMdxImages from 'remark-mdx-images'

const { contents } = await compile(await readFile('example.mdx'), {
  jsx: true,
  remarkPlugins: [remarkMdxImages]
})
console.log(contents)
```

Roughly yields:

```jsx
import kittens from './kittens.png'

export default function MDXContent() {
  return (
    <p>
      <img alt="Very cute kittens" src={kittens} title="Meow!" />
    </p>
  )
}
```

## API

### Options

#### `resolve`

By default imports are resolved relative to the markdown file. This matches default markdown
behaviour. If this is set to false, this behaviour is removed and URLs are no longer processed. This
allows to import images from `node_modules`. If this is disabled, local images can still be imported
by prepending the path with `./`.

## Compatibility

This project is compatible with Node.js 18 or greater.

## License

[MIT](LICENSE.md) © [Remco Haszing](https://github.com/remcohaszing)

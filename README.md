# remark-mdx-images

[![github actions][github actions badge]][github actions] [![npm][npm badge]][npm]
[![prettier][prettier badge]][prettier]

> A [remark][] plugin for changing image sources to JavaScript imports using MDX

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
import { readFileSync } from 'fs';

import { remarkMdxImages } from 'remark-mdx-images';
import { compileSync } from 'xdm';

const { contents } = compileSync(readFileSync('example.mdx'), {
  jsx: true,
  remarkPlugins: [remarkMdxImages],
});
console.log(contents);
```

Roughly yields:

```jsx
import myImage from './image.png';

export const hello = 'frontmatter';

export default function MDXContent() {
  return (
    <p>
      <img alt="Very cute kittens" src={myImage} title="Meow!" />
    </p>
  );
}
```

### Options

#### `resolve`

By default imports are resolved relative to the markdown file. This matches default markdown
behaviour. If this is set to false, this behaviour is removed and URLs are no longer processed. This
allows to import images from `node_modules`. If this is disabled, local images can still be imported
by prepending the path with `./`.

[github actions badge]:
  https://github.com/remcohaszing/remark-mdx-images/actions/workflows/ci.yml/badge.svg
[github actions]: https://github.com/remcohaszing/remark-mdx-images/actions/workflows/ci.yml
[npm badge]: https://img.shields.io/npm/v/remark-mdx-images
[npm]: https://www.npmjs.com/package/remark-mdx-images
[prettier badge]: https://img.shields.io/badge/code_style-prettier-ff69b4.svg
[prettier]: https://prettier.io
[remark]: https://remark.js.org

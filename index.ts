import { join } from 'path';

import { imageSize } from 'image-size';
import { Image, Parent, Root } from 'mdast';
import { MdxjsEsm, MdxJsxTextElement } from 'mdast-util-mdx';
import { Plugin } from 'unified';
import { visit } from 'unist-util-visit';

export interface RemarkMdxImagesOptions {
  /**
   * By default imports are resolved relative to the markdown file. This matches default markdown
   * behaviour. If this is set to false, this behaviour is removed and URLs are no longer processed.
   * This allows to import images from `node_modules`. If this is disabled, local images can still
   * be imported by prepending the path with `./`.
   *
   * @default true
   */
  resolve?: boolean;
  /**
   * Adds the width and height attributes to the image tag.
   *
   * @default false
   */
  includeDimensions?: boolean;
  /**
   * The current working directory of the file being parsed. Used in combination with
   * `includeDimensions` to load images with their specific width/height attributes.
   */
  cwd?: string;
}

// eslint-disable-next-line unicorn/no-unsafe-regex
const urlPattern = /^(https?:)?\//;
const relativePathPattern = /\.\.?\//;
// eslint-disable-next-line unicorn/no-unsafe-regex
const absolutePathRegex = /^(?:[a-z]+:)?\/\//;

/**
 * Gets the size of the image.
 *
 * @param src The image source.
 * @returns the image dimensions
 */
function getImageSize(src: string):
  | {
      /**
       * Width of the image.
       */
      width?: number;
      /**
       * Height of the image.
       */
      height?: number;
    }
  | undefined {
  if (absolutePathRegex.test(src)) {
    return undefined;
  }

  return imageSize(src);
}

/**
 * A Remark plugin for converting Markdown images to MDX images using imports for the image source.
 */
const remarkMdxImages: Plugin<[RemarkMdxImagesOptions?], Root> =
  ({ cwd, includeDimensions = false, resolve = true } = {}) =>
  (ast) => {
    const imports: MdxjsEsm[] = [];
    const imported = new Map<string, string>();
    if (includeDimensions && !cwd) {
      throw new Error('The cwd option is required when includeDimensions is enabled.');
    }

    visit(ast, 'image', (node: Image, index: number | null, parent: Parent | null) => {
      let { alt = null, title, url } = node;
      if (urlPattern.test(url)) {
        return;
      }
      if (!relativePathPattern.test(url) && resolve) {
        url = `./${url}`;
      }

      let name = imported.get(url);
      const size =
        includeDimensions && imagesDirectory ? getImageSize(join(imagesDirectory, url)) : undefined;
      if (!name) {
        name = `__${imported.size}_${url.replace(/\W/g, '_')}__`;

        imports.push({
          type: 'mdxjsEsm',
          value: '',
          data: {
            estree: {
              type: 'Program',
              sourceType: 'module',
              body: [
                {
                  type: 'ImportDeclaration',
                  source: { type: 'Literal', value: url, raw: JSON.stringify(url) },
                  specifiers: [
                    {
                      type: 'ImportDefaultSpecifier',
                      local: { type: 'Identifier', name },
                    },
                  ],
                },
              ],
            },
          },
        });
        imported.set(url, name);
      }

      const textElement: MdxJsxTextElement = {
        type: 'mdxJsxTextElement',
        name: 'img',
        children: [],
        attributes: [
          { type: 'mdxJsxAttribute', name: 'alt', value: alt },
          {
            type: 'mdxJsxAttribute',
            name: 'src',
            value: {
              type: 'mdxJsxAttributeValueExpression',
              value: name,
              data: {
                estree: {
                  type: 'Program',
                  sourceType: 'module',
                  comments: [],
                  body: [{ type: 'ExpressionStatement', expression: { type: 'Identifier', name } }],
                },
              },
            },
          },
        ],
      };
      if (title) {
        textElement.attributes.push({ type: 'mdxJsxAttribute', name: 'title', value: title });
      }
      if (size?.width) {
        textElement.attributes.push({
          type: 'mdxJsxAttribute',
          name: 'width',
          value: String(size.width),
        });
      }
      if (size?.height) {
        textElement.attributes.push({
          type: 'mdxJsxAttribute',
          name: 'height',
          value: String(size.height),
        });
      }
      parent!.children.splice(index!, 1, textElement);
    });
    ast.children.unshift(...imports);
  };

export default remarkMdxImages;

import { MDXEsm, MDXJsxTextElement } from 'hast-util-to-estree';
import { Image } from 'mdast';
import { Plugin } from 'unified';
import { Parent } from 'unist';
import * as visit from 'unist-util-visit';

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
}

// eslint-disable-next-line unicorn/no-unsafe-regex
const urlPattern = /^(https?:)?\//;
const relativePathPattern = /\.\.?\//;

/**
 * A Remark plugin for converting Markdown images to MDX images using imports for the image source.
 */
export const remarkMdxImages: Plugin<[RemarkMdxImagesOptions?]> =
  ({ resolve = true } = {}) =>
  (ast) => {
    const imports: Omit<MDXEsm, 'value'>[] = [];
    const imported = new Map<string, string>();

    visit<Image>(ast, 'image', (node, index, parent) => {
      let { alt = null, title, url } = node;
      if (urlPattern.test(url)) {
        return;
      }
      if (!relativePathPattern.test(url) && resolve) {
        url = `./${url}`;
      }

      let name = imported.get(url);
      if (!name) {
        name = `__${imported.size}_${url.replace(/\W/g, '_')}__`;

        imports.push({
          type: 'mdxjsEsm',
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

      const textElement: MDXJsxTextElement = {
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
      (parent as Parent).children.splice(index, 1, textElement);
    });
    (ast as Parent).children.unshift(...imports);
  };

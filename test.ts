import { readdir, readFile, writeFile } from 'fs/promises';
import process from 'process';

import { compile } from '@mdx-js/mdx';
import prettier from 'prettier';
import { test } from 'uvu';
import { equal } from 'uvu/assert';

import { remarkMdxImages } from './index.js';

const fixturesDir = new URL('__fixtures__/', import.meta.url);
const tests = await readdir(fixturesDir);

for (const name of tests) {
  test(name, async () => {
    const path = new URL(`${name}/`, fixturesDir);
    const input = await readFile(new URL('input.md', path));
    const expected = new URL('expected.jsx', path);
    const options = JSON.parse(await readFile(new URL('options.json', path), 'utf8'));
    const result = await compile(input, {
      remarkPlugins: [[remarkMdxImages, options]],
      jsx: true,
    });
    const output = prettier.format(String(result), { parser: 'babel' });
    if (process.argv.includes('--write')) {
      await writeFile(expected, output);
    }
    equal(output, await readFile(expected, 'utf8'));
  });
}

test.run();

import { promises as fs, readdirSync } from 'fs';
import { createRequire } from 'module';
import { join } from 'path';

import prettier from 'prettier';
import test from 'tape';
import { compile } from 'xdm';

const { remarkMdxImages } = createRequire(import.meta.url)('./src/index.ts');

const tests = readdirSync('__fixtures__');

tests.forEach((name) => {
  test(name, async (t) => {
    const path = join('__fixtures__', name);
    const input = await fs.readFile(join(path, 'input.md'));
    const expected = join(path, 'expected.jsx');
    const options = JSON.parse(await fs.readFile(join(path, 'options.json')));
    const { contents } = await compile(input, {
      remarkPlugins: [[remarkMdxImages, options]],
      jsx: true,
    });
    const output = prettier.format(contents, { parser: 'babel' });
    if (process.argv.includes('--write')) {
      await fs.writeFile(expected, output);
    }
    t.equal(output, await fs.readFile(expected, 'utf8'));
    t.end();
  });
});

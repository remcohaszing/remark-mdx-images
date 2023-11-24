import assert from 'node:assert/strict'
import { readdir, readFile, writeFile } from 'node:fs/promises'
import { test } from 'node:test'

import { compile } from '@mdx-js/mdx'
import prettier from 'prettier'

import remarkMdxImages from './index.js'

const fixturesDir = new URL('fixtures/', import.meta.url)
const tests = await readdir(fixturesDir)

for (const name of tests) {
  test(name, async () => {
    const path = new URL(`${name}/`, fixturesDir)
    const input = await readFile(new URL('input.md', path))
    const expected = new URL('expected.jsx', path)
    const options = JSON.parse(await readFile(new URL('options.json', path), 'utf8'))
    const result = await compile(input, {
      remarkPlugins: [[remarkMdxImages, options]],
      jsx: true
    })
    const prettierConfig = await prettier.resolveConfig(expected.pathname)
    const output = await prettier.format(
      String(result),
      { ...prettierConfig, filepath: expected.pathname }!
    )
    if (process.argv.includes('--write')) {
      await writeFile(expected, output)
    }
    assert.equal(output, await readFile(expected, 'utf8'))
  })
}

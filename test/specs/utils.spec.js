const babel = require('@babel/core')
const plugin = require('@/index')

var example = `
import { a } from 'aa'
let b = 1
`

test('works', () => {
  const code = babel.transform(example, {
    plugins: [
      [
        plugin,
        {
          packageName: 'aa',
          redirect: 'src'
        }
      ]
    ]
  }).code
  expect(code).toEqual('let b = 1;')
});
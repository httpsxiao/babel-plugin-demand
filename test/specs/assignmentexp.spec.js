const babel = require('@babel/core')
const plugin = require('@/index')
const { removeEnter } = require('./utils')

test ('callexpression_args', () => {
  let example = [
    'import { a as aa, b } from "sdk"',
    'let c = b',
    'c = aa'
  ]
  
  let result = [
    'import _a from "sdk/lib/a"',
    'import _b from "sdk/lib/b"',
    'let c = _b',
    'c = _a'
  ]

  let code = babel.transform(example.join(';'), {
    plugins: [
      [
        plugin,
        {
          packageName: 'sdk',
          redirect: 'lib'
        }
      ]
    ]
  }).code
  expect(removeEnter(code)).toEqual(result.join(';'))
})

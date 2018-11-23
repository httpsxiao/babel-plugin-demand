const babel = require('@babel/core')
const plugin = require('@/index')
const { removeEnter } = require('./utils')

test ('callexpression', () => {
  let example = [
    'import { a } from "sdk"',
    'let c = a'
  ]
  
  let result = [
    'import _a from "sdk/lib/a"',
    'let c = _a'
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

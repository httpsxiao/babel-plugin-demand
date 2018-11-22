const babel = require('@babel/core')
const plugin = require('@/index')

var example = `
  import { a as dd } from 'aa'
  let c = dd()
  let b = dd
  let d = [dd, 'aa']
`

test ('works', () => {
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
  expect (code).toEqual(
    ''
  )
})

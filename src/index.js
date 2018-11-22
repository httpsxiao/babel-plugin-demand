import { transSpecified } from './utils'

export default function ({ types }) {
  let specified = Object.create(null)
  let packageObjs = Object.create(null)
  let targetCallee = Object.create(null)
  let removePaths = []

  const Program = {
    enter (path, { opts = {} }) {
    },
    exit () {
      removePaths.forEach(path => !path.removed && path.remove())
    }
  }

  const visitor = {
    Program,
    ImportDeclaration (path, state) {
      const { node } = path
      const { value } = node.source
      if (value === state.opts.packageName) {
        node.specifiers.forEach(spec => {
          if (types.isImportSpecifier(spec)) {
            specified[spec.local.name] = spec.imported.name
          } else {
            packageObjs[spec.local.name] = true
          }
        })
        removePaths.push(path)
      }
    },
    CallExpression (path, state) {
      const { node } = path
      const { name } = node.callee
      const file = (path && path.hub && path.hub.file) || (state && state.file)

      if (types.isIdentifier(node.callee)) {
        if (specified[name]) {
          node.callee = transSpecified(specified[name], file, targetCallee, state.opts)
        }
      }

      node.arguments = node.arguments.map(arg => {
        const { name: argName } = arg
        if (
          specified[argName] &&
          path.scope.hasBinding(argName) &&
          path.scope.getBinding(argName).path.type === 'ImportSpecifier'
        ) {
          return transSpecified(specified[argName], file, targetCallee, state.opts)
        }
        return arg
      })
    }
  }

  return {
    visitor
  }
}

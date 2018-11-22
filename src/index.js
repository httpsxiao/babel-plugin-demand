const { turnSpecified, expressionHandler, isGlobalScope } = require('./utils')

module.exports = function ({ types }) {
  let specified = Object.create(null)
  let packageObjs = Object.create(null)
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
          node.callee = turnSpecified(specified[name], file, state.opts)
        }
      }

      node.arguments = node.arguments.map(arg => {
        const { name: argName } = arg
        if (
          specified[argName] &&
          path.scope.hasBinding(argName) &&
          path.scope.getBinding(argName).path.type === 'ImportSpecifier'
        ) {
          return turnSpecified(specified[argName], file, state.opts)
        }
        return arg
      })
    },
    MemberExpression (path, state) {
      const { node } = path
      const file = (path && path.hub && path.hub.file) || (state && state.file)
      if (!node.object || !node.object.name) { return }

      if (packageObjs[node.object.name]) {
        path.replaceWith(turnSpecified(node.property.name, file, state.opts))
      } else if (specified[node.object.name]) {
        node.object = turnSpecified(specified[node.object.name], file, state.opts)
      }
    },
    VariableDeclarator (path, state) {
      expressionHandler(path, state, types, specified, ['init'])
    },
    Property (path, state) {
      expressionHandler(path, state, types, specified, ['value'])
    },
    ArrayExpression (path, state) {
      const props = path.node.elements.map((p, index) => index)
      expressionHandler(path, state, types, specified, props, path.node.elements)
    },
    AssignmentExpression (path, state) {
      expressionHandler(path, state, types, specified, ['right'])
    },
    LogicalExpression (path, state) {
      expressionHandler(path, state, types, specified, ['left', 'right'])
    },
    ConditionalExpression (path, state) {
      expressionHandler(path, state, types, specified, ['test', 'consequent', 'alternate'])
    },
    IfStatement (path, state) {
      expressionHandler(path, state, types, specified, ['test'])
    },
    ExportDefaultDeclaration (path, state) {
      expressionHandler(path, state, types, specified, ['declaration'])
    },
    BinaryExpression (path, state) {
      expressionHandler(path, state, types, specified, ['left', 'right'])
    },
    NewExpression (path, state) {
      expressionHandler(path, state, types, specified, ['callee', 'arguments'])
    },
    ReturnStatement (path, state) {
      const { node } = path
      const file = (path && path.hub && path.hub.file) || (state && state.file)

      if (
        node.argument &&
        types.isIdentifier(node.argument) &&
        specified[node.argument.name] &&
        isGlobalScope(path, specified[node.argument.name])
      ) {
        node.argument = turnSpecified(specified[node.argument.name], file, state.opts)
      }
    }
  }

  return {
    visitor
  }
}

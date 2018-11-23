const { addDefault } = require('@babel/helper-module-imports')
const { existsSync } = require('fs')
const { join } = require('path')

const trunedMethod = Object.create(null)

function parseName (name, camel2Dash) {
  if (!camel2Dash) { return name }
  const transName = name[0].toLowerCase() + name.substr(1)
  return transName.replace(/[A-Z]/g, $1 => `-${$1.toLowerCase()}`)
}

function isExist (path, ext = 'js') {
  return existsSync(join(__dirname, '../..', `${path}.${ext}`))
}

function turnSpecified (methodName, file, opts) {
  if (!trunedMethod[methodName]) {
    const packageName = opts.packageName
    const redirect = opts.redirect || 'lib'
    const moreRedirect = opts.moreRedirect || []
    const parsedName = parseName(methodName, opts.camel2Dash)
    let path = `${packageName}/${redirect}/${parsedName}`

    if (!isExist(path) && !!moreRedirect.length) {
      moreRedirect.some(item => {
        if (isExist(`${packageName}/${item}/${parsedName}`)) {
          path = `${packageName}/${item}/${parsedName}`
          return true
        }
      })
    }

    trunedMethod[methodName] = addDefault(file.path, path, { nameHint: methodName })
  }
  return trunedMethod[methodName]
}

function expressionHandler (path, state, types, specified, props, element) {
  const file = (path && path.hub && path.hub.file) || (state && state.file)
  let { node } = path
  if (element) { node = element }

  props.forEach(prop => {
    if (!types.isIdentifier(node[prop])) { return }
    if (
      specified[node[prop].name] &&
      path.scope.hasBinding(node[prop].name) &&
      path.scope.getBinding(node[prop].name).path.type === 'ImportSpecifier'
    ) {
      node[prop] = turnSpecified(specified[node[prop].name], file, state.opts)
    }
  })
}

function isGlobalScope (path, name) {
  const parentPath = path.findParent(p => p.scope.hasOwnBinding(name))
  return !!parentPath && parentPath.isProgram()
}

module.exports = {
  turnSpecified,
  expressionHandler,
  isGlobalScope
}

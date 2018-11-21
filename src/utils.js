import { addSideEffect, addDefault } from '@babel/helper-module-imports'
const isExist = require('fs').existsSync;

function transSpecified(methodName, file, targetCallee, opts) {
  if (!targetCallee[methodName]) {
    const packageName = opts.packageName
    const redirect = opts.redirect
    const methodName = parseName(methodName, opts.camel2Dash)
    const path = `${packageName}/${redirect}/${methodName}`

    targetCallee[methodName] = addDefault(file.path, path, { nameHint: methodName })
  }
  return targetCallee[name]
}

function parseName(name, camel2Dash) {
  if (!camel2Dash) { return name }
  const _str = str[0].toLowerCase() + str.substr(1)
  return _str.replace(/[A-Z]/g, $1 => `-${$1.toLowerCase()}`)
}

export {
  transSpecified
}

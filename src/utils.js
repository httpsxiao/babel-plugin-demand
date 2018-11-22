import { addDefault } from '@babel/helper-module-imports'
// const isExist = require('fs').existsSync

function transSpecified (methodName, file, targetCallee, opts) {
  if (!targetCallee[methodName]) {
    const packageName = opts.packageName
    const redirect = opts.redirect
    const parsedName = parseName(methodName, opts.camel2Dash)
    const path = `${packageName}/${redirect}/${parsedName}`

    targetCallee[methodName] = addDefault(file.path, path, { nameHint: methodName })
  }
  return targetCallee[methodName]
}

function parseName (name, camel2Dash) {
  if (!camel2Dash) { return name }
  const transName = name[0].toLowerCase() + name.substr(1)
  return transName.replace(/[A-Z]/g, $1 => `-${$1.toLowerCase()}`)
}

export {
  transSpecified
}

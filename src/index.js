import { applyInstance } from './utils'

demand_global.specifier = Object.create(null)
  demand_global.packageObjs = Object.create(null);
  demand_global.selectedMethods = Object.create(null);
  demand_global.removePaths = [];

export default function ({ types }) {
  let specifier = Object.create(null)
  let packageObjs = Object.create(null)
  let removePaths = []
  let packageName = ''

  const visitor = {
    enter(path, { opts = {} }) {
      packageName = opts.packageName
    },
    ImportDeclaration(path, state) {
      const { node } = path
      const { value } = node.source
      if (value === packageName) {
        node.specifiers.forEach(spec => {
          if (types.isImportSpecifier(spec)) {
            specifier[spec.local.name] = spec.imported.name
          } else {
            packageObjs[spec.local.name] = true
          }
        })
        removePaths.push(path)
      }
    },
    exit() {
    }
  }

  return {
    visitor
  }
}
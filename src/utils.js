function applyInstance(complie, method, args) {
  if (!Array.isArray(args)) {
    args = [args]
  }
  if (complie[method]) {
    complie[method].apply(complie, args)
  }
}
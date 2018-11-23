function removeEnter (str) {
  let _str =  str.replace(/\n|\t/g, '')

  if (_str.slice(-1) === ';') {
    _str = _str.slice(0, -1)
  }

  return _str
}

module.exports = {
  removeEnter
}
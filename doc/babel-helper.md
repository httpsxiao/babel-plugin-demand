# babel-helper-module-imports

这个库提供了在文件中添加 `import` 的方法

### addSideEffect

```javascript
  addSideEffect(path, 'lib')
```

这个方法将在 `js` 文件中被转为如下代码：

```javascript
  import 'lib'
```

### addDefault

* 
```javascript
  addDefault(path, 'lib')
```

这个方法将在 `js` 文件中被转为如下代码：

```javascript
  import _default from 'lib'
```

* 
```javascript
  addDefault(path, 'lib', { nameHint: 'defaultName' })
```

这个方法将在 `js` 文件中被转为如下代码：

```javascript
  import _defaultName from 'lib'
```

### addNamed

* 
```javascript
  addNamed(path, 'methodName', 'lib')
```

这个方法将在 `js` 文件中被转为如下代码：

```javascript
  import { methodName } from 'lib'
```

* 
```javascript
  addNamed(path, 'methodName', { nameHint: 'reName' })
```

这个方法将在 `js` 文件中被转为如下代码：

```javascript
  import { methodName as _reName } from 'a'
```

### addNamespace

* 
```javascript
  addNamespace(path, 'lib')
```

这个方法将在 `js` 文件中被转为如下代码：

```javascript
  import * as _namespace from 'lib'
```

* 
```javascript
  addNamespace(path, 'lib', { nameHint: 'namespaceName' })
```

这个方法将在 `js` 文件中被转为如下代码：

```javascript
  import * as _namespaceName from 'lib'
```
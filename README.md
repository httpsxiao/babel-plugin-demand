# babel-plugin-demand

用于公共 js 库按需加载的babel插件

[![NPM version](https://img.shields.io/npm/v/babel-plugin-demand.svg)](https://npmjs.org/package/babel-plugin-demand)
[![Build Status](https://img.shields.io/travis/httpsxiao/babel-plugin-demand.svg)](https://img.shields.io/travis/httpsxiao/babel-plugin-demand.svg)

## Install

```shell
npm i babel-plugin-demand -D
```

## Usage

在 `.babelrc` 或者 babel-loader 文件中配置

```javascript
{
  "plugins": [
    [
      "demand", {
        packageName: 'xx-sdk',
        redirect: 'lib'
        // ...options
      }
    ]
  ]
}
```

## Example

```javascript
import { foo } from 'xx-sdk'
foo()
```

上述代码会被转为

```javascript
import _foo from 'xx-sdk/lib/foo'
_foo()
```

### options

|参数名称|类型|含义|是否必填|默认值|
|:-----:|:-----:|:-----:|:-----:|:-----:|
| packageName | String | js 包的名字 | 是 | 无 |
| redirect | String | 函数所在的目录 | 否 | 'lib' |
| moreRedirect | Array<String> | 当`redirect`目录不存在时,自动检索该数组中的路径 | 否 | [] |
| camel2Dash | Boolean | 驼峰文件名是否需要转为'-'连接 | 否 | false |

### more

* 编译过程中 ast 的 types 可以参考doc文件下的 [ast-types](https://github.com/httpsxiao/babel-plugin-demand/tree/master/doc/ast-types.md)

* helper 信息参考
(https://github.com/httpsxiao/babel-plugin-demand/tree/master/doc/babel-helper.md)

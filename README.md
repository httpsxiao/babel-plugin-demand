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

|参数名称|含义|类型|是否必填|默认值|
|:-----:|:-----:|:-----:|:-----:|:-----:|
| packageName | js 包的名字 | String | 是 | 无 |
| redirect | 函数所在的目录 | String | 否 | 'lib' |
| camel2Dash | 驼峰文件名是否需要转为'-'连接 | Boolean | 否 | false |

# babel 7

babel V7.0.0-beta.55 开始，已经删除了 babel 的 presets 预设, 详情可查看 [https://babeljs.io/blog/2018/07/27/removing-babels-stage-presets](https://babeljs.io/blog/2018/07/27/removing-babels-stage-presets)

* preset-stage-0 转为

```json
plugins: [
  "@babel/plugin-proposal-function-bind"
]
```

* preset-stage-1 转为

```json
plugins: [
  "@babel/plugin-proposal-export-default-from",
  "@babel/plugin-proposal-logical-assignment-operators",
  ["@babel/plugin-proposal-optional-chaining", { "loose": false }],
  ["@babel/plugin-proposal-pipeline-operator", { "proposal": "minimal" }],
  ["@babel/plugin-proposal-nullish-coalescing-operator", { "loose": false }],
  "@babel/plugin-proposal-do-expressions"
]
```

* preset-stage-2 转为

```json
plugins: [
  ["@babel/plugin-proposal-decorators", { "legacy": true }],
  "@babel/plugin-proposal-function-sent",
  "@babel/plugin-proposal-export-namespace-from",
  "@babel/plugin-proposal-numeric-separator",
  "@babel/plugin-proposal-throw-expressions"
]
```

* preset-stage-3 转为

```json
plugins: [
  "@babel/plugin-syntax-dynamic-import",
  "@babel/plugin-syntax-import-meta",
  ["@babel/plugin-proposal-class-properties", { "loose": false }],
  "@babel/plugin-proposal-json-strings"
]
```

更多升级信息查看 [https://github.com/babel/babel-upgrade](https://github.com/babel/babel-upgrade)

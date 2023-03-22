module.exports = {
  // "root": true,
  "env": {
    "node": true,
    "browser": true,
    "commonjs": true,
    "es6": true
  },
  "extends": [
    "plugin:vue/essential",
    "eslint:recommended"
  ],
  "rules": {
    "no-useless-escape":"off",
    "no-console":"off",
    'no-unused-vars': 'off',
    'no-debugger': 'off'
  },
  "parserOptions": {
    "parser": "babel-eslint",
    "sourceType": "module"
  },
}

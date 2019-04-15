module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'airbnb'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      tsx: true,
    },
    ecmaVersion: 2018,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react',],
  rules: {
    "import/no-unresolved": "off",
    "lines-between-class-members": "off",
    "padded-blocks": "off",
    "indent": ["error", "tab"],
    "class-methods-use-this": "off",
    "no-undef": "off",
    "@typescript-eslint/explicit-member-accessibility": "off",
    "import/prefer-default-export": "off",
    "no-console": "off",
    "@typescript-eslint/indent": ["error", "tab"],
    "no-tabs": "off",
    "no-underscore-dangle": "off",
    "object-curly-newline": "off",
    "react/jsx-filename-extension": "off",
    "react/jsx-indent": ["error", "tab"],
    "react/jsx-indent-props": ["error", "tab"],
    "react/button-has-type": "off",
    "no-unused-expressions": "off",
    "jsx-a11y/label-has-associated-control": "off",
    "jsx-a11y/label-has-for": "off",
    "array-callback-return": "off"
  }
};

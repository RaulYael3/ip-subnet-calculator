module.exports = {
    env: { browser: true, es6: true },
    extends: [
      "eslint:recommended",
      "plugin:react/recommended",
      "plugin:@typescript-eslint/recommended",
      "prettier",
    ],
    parser: "@typescript-eslint/parser",
    plugins: ["react", "@typescript-eslint", "prettier"],
    rules: {
      "prettier/prettier": "error",
      "@typescript-eslint/explicit-module-boundary-types": "off",
    },
  };
  
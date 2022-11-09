// "plugin:@typescript-eslint/eslint-recommended",
// "prettier/@typescript-eslint",
// "plugin:prettier/recommended",
// "next/core-web-vitals"

module.exports = {
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  root: true,
  parser: "@typescript-eslint/parser",
  overrides: [{ files: ["*.ts", "*.tsx"] }],
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname
  },
  plugins: ["@typescript-eslint"]
};

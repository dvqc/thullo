/** @type {import("prettier").Config} */
const config = {
  semi: true,
  singleQuote: false,
  trailingComma: "none",
  printWidth: 120,
  plugins: [require.resolve("prettier-plugin-tailwindcss")]
};

module.exports = config;

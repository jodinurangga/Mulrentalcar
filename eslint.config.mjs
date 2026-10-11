import nextConfig from "eslint-config-next";

const eslintConfig = [
  ...nextConfig,
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "dist/**",
      "out/**",
      "vitest.config.*",
      "playwright.config.ts",
    ],
  },
];

export default eslintConfig;

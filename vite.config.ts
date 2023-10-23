import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig, PluginOption } from "vite";
import dts from "vite-plugin-dts";
import tsconfigPaths from "vite-tsconfig-paths";

import pkg from "./package.json";

const externalPackages = Object.keys(pkg.dependencies || {});
// Creating regexes of the packages to make sure subpaths of the packages are also treated as external
const regexesOfPackages = externalPackages.map(packageName => new RegExp(`^${packageName}(/.*)?`));

export default defineConfig(() => {
  const plugins: PluginOption[] = [react(), tsconfigPaths()];

  if (process.env.TYPES === "true") {
    plugins.push(
      dts({
        insertTypesEntry: true
      })
    );
  }


  return {
    plugins,
    root: "./",
    build: {
      sourcemap: true,
      lib: {
        entry: resolve(__dirname, "src/index.ts"),
        formats: ["cjs", "es"],
        fileName: (format, entryName) => `${entryName}.${format === "es" ? "mjs" : "js"}`
      },
      publicDir: "public",
      rollupOptions: {
        external: regexesOfPackages,
        output: {
          preserveModules: true,
          globals: {
            react: "React"
          }
        }
      }
    }
  };
});

import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./index.ts"],
  outDir: "dist",

  format: ["esm"],
  target: "node20",

  bundle: true,
  splitting: false,
  clean: true,
  external:[
    "@repo/shared", "@repo/db"
  ],
});

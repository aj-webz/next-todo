import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./src/index.ts"],
  outDir: "dist",

  format: ["esm"],
  target: "node20",
  dts:true,
  bundle: true,
  splitting: false,
  clean: true,
  external:[
    "@repo/shared", "@repo/db"
  ],
});

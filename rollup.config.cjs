const typescript = require("rollup-plugin-typescript2")
const { nodeResolve } = require("@rollup/plugin-node-resolve")
const del = require("rollup-plugin-delete")

const config = [
  {
    input: ["src/index.tsx"],
    output: [
      {
        dir: "dist",
        format: "es",
        preserveModules: true,
      },
      {
        dir: "commonjs",
        format: "cjs",
        preserveModules: true,
        interop: "auto",
        entryFileNames: "[name].cjs",
      },
    ],
    plugins: [
      del({ targets: ["dist/", "commonjs/"] }),
      nodeResolve({
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      }),
      typescript(),
      del({
        targets: ["dist/playground", "commonjs/playground"],
        hook: "closeBundle",
      }),
    ],
    external: [/node_modules/],
  },
]

module.exports = config

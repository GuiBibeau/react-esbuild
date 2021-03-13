const { build } = require("esbuild");
const rimraf = require("rimraf");
const fs = require("fs-extra");

const generateBuild = async () => {
  fs.rmdirSync('./build', { recursive: true });

  await fs.rmdirSync("./build/static", { recursive: true });

  await build({
    entryPoints: ["./src/index.tsx"],
    outdir: "./build/static/js",
    minify: true,
    bundle: true,
    sourcemap: true,
    target: ["chrome58", "firefox57", "edge16"],
    loader: { ".svg": "dataurl", ".png": "dataurl" },
    define: {
      "process.env.NODE_ENV": "'production'",
    },
  }).catch(() => process.exit(1));

  fs.copyFile('public/index.html', 'build/index.html', (err) => {
    if (err) throw err;
    console.log('source.txt was copied to destination.txt');
  });
  
};

generateBuild();

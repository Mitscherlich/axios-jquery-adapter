import esbuild, { minify } from 'rollup-plugin-esbuild'
import dts from 'rollup-plugin-dts'
import packageJson from './package.json'

function createEntries(configs) {
  return configs.map((c) => createEntry(c))
}

function createEntry(config) {
  const c = {
    input: './src/index.ts',
    plugins: [],
    output: {
      file: config.file,
      format: config.format,
      sourcemap: !!config.sourcemap,
      globals: { jquery: '$' },
      exports: 'auto',
    },
    external: ['jquery', 'axios'],
  }

  const esbuildOptions = {
    target: 'esnext',
    define: {
      __VERSION__: JSON.stringify(packageJson.version),
    },
  }

  if (config.format === 'umd') {
    c.output.name = config.name || packageJson.name
  }

  if (config.declaration) {
    c.plugins.push(dts())
  } else {
    c.plugins.push(esbuild(esbuildOptions))
  }

  if (config.minify) {
    c.plugins.push(minify())
  }

  return c
}

export default createEntries([
  {
    file: `dist/${packageJson.name}.esm.js`,
    format: 'es',
    sourcemap: true,
  },
  {
    file: `dist/${packageJson.name}.js`,
    name: 'axiosJqueryAdapter',
    format: 'cjs',
    sourcemap: true,
  },
  // {
  //   file: `dist/${packageJson.name}.min.js`,
  //   name: 'axiosJqueryAdapter',
  //   format: 'umd',
  //   sourcemap: true,
  //   minify: true,
  // },
  {
    file: `types/index.d.ts`,
    format: 'es',
    declaration: true,
  },
])

import esbuild, { minify } from 'rollup-plugin-esbuild'
import dts from 'rollup-plugin-dts'
import packageJson from './package.json'

function createEntries(configs) {
  return configs.map((c) => createEntry(c))
}

function createEntry(config) {
  if (config.format === 'dts') {
    return {
      input: './src/index.d.ts',
      plugins: [dts()],
      output: {
        file: './types/index.d.ts',
        format: 'es',
      },
    }
  }

  const c = {
    input: './src/index.ts',
    plugins: [],
    output: {
      file: config.file,
      format: config.format,
      sourcemap: true,
      globals: {
        jquery: '$',
      },
    },
    external: ['jquery'],
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

  if (config.minify) {
    c.plugins.push(minify())
  }

  c.plugins.push(esbuild(esbuildOptions))

  return c
}

export default createEntries([
  {
    file: `dist/${packageJson.name}.esm.js`,
    format: 'es',
  },
  {
    file: `types/index.d.js`,
    format: 'dts',
  },
  {
    file: `dist/${packageJson.name}.umd.js`,
    name: 'axiosJqueryAdapter',
    format: 'umd',
  },
  {
    file: `dist/${packageJson.name}.min.js`,
    name: 'axiosJqueryAdapter',
    format: 'umd',
    minify: true,
  },
])

import * as esbuild from 'esbuild';

const definitions = {
}

definitions['API_HOST'] = JSON.stringify(process.env.API_HOST || 'DEFAULT_ORIGIN');


await esbuild.build({
    entryPoints: ['assets/ts/index.ts'],
    bundle: true,
    sourcemap: true,
    outdir: 'public/',
    platform: 'node',
    target: 'es2020',
    define: definitions,
})
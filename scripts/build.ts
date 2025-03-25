// build.ts
import { BuildConfig } from "bun";

const config: BuildConfig = {
    minify: true,
    target: 'node',
    splitting: true,
    outdir: './dist',
    entrypoints: ['./src/index.ts'],
};

await Bun.build(config);
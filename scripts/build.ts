// build.ts
import { BuildConfig } from "bun";
import { readdirSync, existsSync, mkdirSync } from "fs";
import { join, dirname, basename } from "path";

// Main build configuration
const mainConfig: BuildConfig = {
    minify: true,
    target: 'node',
    splitting: true,
    outdir: './dist',
    entrypoints: ['./src/index.ts'],
};

// Build the main bundle
await Bun.build(mainConfig);

// Function to recursively find all directories
function findAllDirectories(dir: string): string[] {
    if (!existsSync(dir)) return [];
    
    const entries = readdirSync(dir, { withFileTypes: true });
    const directories = entries
        .filter(entry => entry.isDirectory())
        .map(entry => join(dir, entry.name));
    
    const subdirectories = directories.flatMap(directory => findAllDirectories(directory));
    return [...directories, ...subdirectories];
}

// Function to build individual module files
async function buildModules() {
    // Find all directories in src
    const directories = findAllDirectories('./src');
    
    // For each directory, build its index.ts file
    for (const dir of directories) {
        const indexPath = join(dir, 'index.ts');
        if (!existsSync(indexPath)) continue;
        
        // Create relative output path
        const relativePath = dir.replace('./src/', '');
        const outdir = join('./dist', relativePath);
        
        // Build the module
        await Bun.build({
            minify: true,
            target: 'node',
            splitting: false,
            outdir,
            entrypoints: [indexPath],
        });
        
        // Build individual files in the directory
        const files = readdirSync(dir, { withFileTypes: true })
            .filter(entry => entry.isFile() && entry.name.endsWith('.ts') && entry.name !== 'index.ts')
            .map(entry => join(dir, entry.name));
        
        for (const file of files) {
            const fileName = basename(file, '.ts');
            const outdir = join('./dist', relativePath);
            
            await Bun.build({
                minify: true,
                target: 'node',
                splitting: false,
                outdir,
                entrypoints: [file],
            });
        }
        
        // Create flattened module structure for easier imports
        // For example: techniques/bitwise -> bitwise
        if (relativePath.includes('/')) {
            const moduleName = relativePath.split('/').pop() || '';
            const flatOutdir = join('./dist', moduleName);
            
            // Ensure directory exists
            if (!existsSync(flatOutdir)) {
                mkdirSync(flatOutdir, { recursive: true });
            }
            
            // Build the module with a flattened structure
            await Bun.build({
                minify: true,
                target: 'node',
                splitting: false,
                outdir: flatOutdir,
                entrypoints: [indexPath],
            });
            
            // Build individual files with a flattened structure
            for (const file of files) {
                await Bun.build({
                    minify: true,
                    target: 'node',
                    splitting: false,
                    outdir: flatOutdir,
                    entrypoints: [file],
                });
            }
        }
    }
}

// Run the module builds
await buildModules();
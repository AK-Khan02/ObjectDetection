import { copyFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const __dirname = dirname(fileURLToPath(import.meta.url));

const wasmFiles = [
    'ort-wasm.wasm',
    'ort-wasm-threaded.wasm',
    'ort-wasm-simd.wasm',
    'ort-wasm-threaded-simd.wasm'
];

async function copyWasmFiles() {
    const onnxRuntimePath = dirname(require.resolve('onnxruntime-web'));
    
    for (const file of wasmFiles) {
        const source = join(onnxRuntimePath, file);
        const destination = join(__dirname, 'public', file);
        try {
            await copyFile(source, destination);
            console.log(`Copied ${file} successfully`);
        } catch (error) {
            console.error(`Error copying ${file}:`, error);
        }
    }
}

copyWasmFiles();

import { createReadStream, createWriteStream, promises } from 'fs';
import { createGzip } from 'zlib';
import { join } from 'path';
import { pipeline } from 'stream/promises';

export async function compressedFile(currentDir, filePath, destinationPath) {
    try {
        const fileName = filePath.split('/').pop();
        const sourceFile = join(currentDir, filePath);
        const compressedFile = join(currentDir, destinationPath, `${fileName}.gz`);

        await promises.access(sourceFile);

        await pipeline(
            createReadStream(sourceFile),
            createGzip(),
            createWriteStream(compressedFile)
        );

        console.log('File compressed successfully');
    } catch {
        console.error('Operation failed');
    }
};

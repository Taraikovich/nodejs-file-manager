import { createReadStream, createWriteStream, promises } from 'fs';
import { createGunzip } from 'zlib';
import { join } from 'path';
import { pipeline } from 'stream/promises';

export async function decompressFile(currentDir, filePath, destinationPath) {
    try {
        const fileName = filePath.split('/').pop();
        const sourceFile = join(currentDir, filePath);
        const compressedFile = join(currentDir, destinationPath, `${fileName.slice(0, -3)}`);

        await promises.access(sourceFile);

        await pipeline(
            createReadStream(sourceFile),
            createGunzip(),
            createWriteStream(compressedFile)
        );

        console.log('File decompressed successfully');
    } catch (err) {
        console.error('Operation failed', err);
    }
};

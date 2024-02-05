import { createReadStream, createWriteStream } from 'node:fs';
import { join } from 'path';

export async function copyFile(currentDir, sourcePath, destinationDirectory) {
    const fileName = sourcePath.split('/').pop();

    const readStream = createReadStream(join(currentDir, sourcePath));
    const writeStream = createWriteStream(join(currentDir, destinationDirectory, fileName));

    readStream.on('error', (err) => {
        console.error('Operation failed');
    });

    writeStream.on('error', (err) => {
        console.error('Operation failed');
    });

    writeStream.on('finish', () => {
        console.log('File copied successfully');
    });

    readStream.pipe(writeStream);
}
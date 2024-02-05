import { createReadStream, createWriteStream } from 'node:fs';
import { access, unlink, constants } from 'node:fs/promises';
import { join } from 'path';

export async function moveFile(currentDir, sourcePath, destinationDirectory) {
    const fileName = sourcePath.split('/').pop();
    const sourceFile = join(currentDir, sourcePath);

    const readStream = createReadStream(sourceFile);
    const writeStream = createWriteStream(join(currentDir, destinationDirectory, fileName));

    readStream.on('error', (err) => {
        console.error('Operation failed');
    });

    writeStream.on('error', (err) => {
        console.error('Operation failed');
    });

    writeStream.on('finish', async () => {
        try {
            await access(sourceFile, constants.R_OK);
            await unlink(sourceFile);
            console.log('File moved successfully');
        } catch {
            console.error('Operation failed');
        }
    });

    readStream.pipe(writeStream);
}
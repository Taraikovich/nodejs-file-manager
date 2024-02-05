import { createReadStream } from 'node:fs';
import { createHash } from 'node:crypto';
import { join } from 'path';

export function calculateFileHash(currentDir, filePath) {
    const hash = createHash('sha256');
    const stream = createReadStream(join(currentDir, filePath));

    return new Promise(() => {
        stream.on('data', (data) => hash.update(data));
        stream.on('end', () => {
            console.log(hash.digest('hex'));
            console.log(`You are currently in ${currentDir}`);
        });
        stream.on('error', () => {
            console.log(hash.digest('hex'));
            console.error('Operation failed');
        });
    });
}
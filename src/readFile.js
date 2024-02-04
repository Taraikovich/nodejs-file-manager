import { createReadStream } from 'node:fs';
import { access, constants } from 'node:fs/promises';
import { join } from 'path';

export async function getContent(path, input) {
    try {
        await access(join(path, input), constants.R_OK);
        const readableStream = createReadStream(join(path, input), { encoding: 'utf-8' });

        readableStream.on('data', (chunk) => {
            process.stdout.write(chunk);
        });

        return new Promise((resolve, reject) => {
            readableStream.on('end', resolve);
            readableStream.on('error', reject);
        });
    } catch {
        console.error('Operation failed');
    }
}
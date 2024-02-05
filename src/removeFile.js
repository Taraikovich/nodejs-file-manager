import { access, unlink, constants } from 'node:fs/promises';
import { join } from 'node:path';

export async function removeFile(currentDir, path) {
    const fileToRemove = join(currentDir, path);

    try {
        await access(fileToRemove, constants.R_OK);
        await unlink(fileToRemove);
        console.log('File removed successfully');
    } catch {
        console.error('Operation failed');
    }
};
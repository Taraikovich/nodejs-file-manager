import { join } from 'node:path';
import { access, constants } from 'node:fs/promises';

export async function setDir(currentDir, input) {
    const newDir = (input[1] === ':') ? input : join(currentDir, input);

    try {
        await access(newDir, constants.R_OK | constants.W_OK);
        return newDir;
    } catch {
        console.error('Operation failed');
        return currentDir;
    }
}
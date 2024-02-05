import { access, rename as fsRename, constants } from 'node:fs/promises';
import { join } from 'node:path';

export async function renameFile(path, sourceFileName, destinationFileName) {
    const sourceFile = join(path, sourceFileName);
    const destinationFile = join(path, destinationFileName);

    try {
        await access(sourceFile, constants.R_OK);

        try {
            await access(destinationFile, constants.F_OK);
            console.error('Operation failed');
        } catch (err) {
            if (err.code === 'ENOENT') {
                await fsRename(sourceFile, destinationFile);
                console.log('File renamed successfully');
            } else {
                console.error('Operation failed');
            }
        }
    } catch {
        console.error('Operation failed');
    }
};
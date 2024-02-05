import { open, write, close } from 'node:fs';
import { join } from 'path';

export async function createFile(path, fileName) {
    const filePath = join(path, fileName);

    open(filePath, 'wx', (openErr, fd) => {
        if (openErr) {
            console.error('Operation failed');
        } else {
            const text = '';

            write(fd, text, (writeErr) => {
                if (writeErr) {
                    console.error('Operation failed');
                }

                close(fd, (closeErr) => {
                    if (closeErr) {
                        console.error('Operation failed');
                    } else {
                        console.log('File created successfully');
                    }
                });
            });
        }
    });
};

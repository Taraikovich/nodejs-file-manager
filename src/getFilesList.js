import { access, readdir, stat, constants } from 'node:fs/promises';
import { join } from 'node:path';

function calcLength(length, str) {
    const padStart = Math.floor((length - str.length) / 2);
    const padEnd = length - str.length - padStart;

    return ' '.repeat(padStart) + str + ' '.repeat(padEnd);
}

export async function getFilesList(folderPath) {

    try {
        await access(folderPath, constants.R_OK);

        let files = await readdir(folderPath);

        const fileStats = await Promise.all(
            files.map(async (file) => {
                const filePath = join(folderPath, file);
                try {
                    const stats = await stat(filePath);
                    return { name: file, isDirectory: stats.isDirectory() };
                } catch (error) {
                    return { name: file, isDirectory: false };
                }
            })
        );

        fileStats.sort((a, b) => {
            if (a.isDirectory && !b.isDirectory) {
                return -1;
            } else if (!a.isDirectory && b.isDirectory) {
                return 1;
            } else {
                return a.name.localeCompare(b.name);
            }
        });

        const indexColLength = 9;
        const nameColLength = Math.max(...files.map(i => i.length)) + 2;
        const typeColLength = 8;

        console.log('\x1b[32m%s\x1b[0m', `\n┌${'─'.repeat(indexColLength)}┬${'─'.repeat(nameColLength)}┬${'─'.repeat(typeColLength)}┐`);
        console.log('\x1b[32m%s\x1b[0m', `│${calcLength(indexColLength, '(index)')}│${calcLength(nameColLength, 'Name')}│${calcLength(typeColLength, 'Type')}│`);
        console.log('\x1b[32m%s\x1b[0m', `├${'─'.repeat(indexColLength)}┼${'─'.repeat(nameColLength)}┼${'─'.repeat(typeColLength)}┤`);

        let number = 1;

        for (const file of fileStats) {
            const fileType = file.isDirectory ? 'Folder' : 'File';

            console.log('\x1b[32m%s\x1b[0m', `│${calcLength(indexColLength, String(number))}│${calcLength(nameColLength, file.name)}│${calcLength(typeColLength, fileType)}│`);
            number++;
        }

        console.log('\x1b[32m%s\x1b[0m', `└${'─'.repeat(indexColLength)}┴${'─'.repeat(nameColLength)}┴${'─'.repeat(typeColLength)}┘`);
    } catch {
        console.error('Operation failed');
    }
}

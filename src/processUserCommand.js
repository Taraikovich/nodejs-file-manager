import { copyFile } from "./copyFile.js";
import { createFile } from "./createFile.js";
import { getFilesList } from "./getFilesList.js";
import { getHomeDir } from "./getHomeDir.js";
import { rl } from "./index.js";
import { moveFile } from "./moveFile.js";
import { getContent } from "./readFile.js";
import { removeFile } from "./removeFile.js";
import { renameFile } from "./renameFile.js";
import { setDir } from "./setDir.js";

export let currentDir = getHomeDir();

export async function processUserCommand(command) {
    if (command === 'help') {
        console.log('Available commands: help, cwd, exit');
        console.log(`You are currently in ${currentDir}`);
    } else if (command === 'up') {
        const slashIndex = currentDir.lastIndexOf('\\');
        currentDir = (slashIndex < 0) ? currentDir : currentDir.slice(0, currentDir.lastIndexOf('\\'))
        console.log(`You are currently in ${currentDir}`);
    } else if (command.startsWith('cd ')) {
        currentDir = await setDir(currentDir, command.slice(3));
        console.log(`You are currently in ${currentDir}`);
    } else if (command === 'ls') {
        await getFilesList(currentDir);
        console.log(`You are currently in ${currentDir}`);
    } else if (command.startsWith('cat ')) {
        await getContent(currentDir, command.slice(4))
        console.log(`\nYou are currently in ${currentDir}`);
    } else if (command.startsWith('add ')) {
        await createFile(currentDir, command.slice(4))
        console.log(`You are currently in ${currentDir}`);
    } else if (command.startsWith('rn ')) {
        await renameFile(currentDir, ...command.slice(3).split(' '))
        console.log(`You are currently in ${currentDir}`);
    } else if (command.startsWith('cp ')) {
        await copyFile(currentDir, ...command.slice(3).split(' '))
        console.log(`You are currently in ${currentDir}`);
    } else if (command.startsWith('mv ')) {
        await moveFile(currentDir, ...command.slice(3).split(' '))
        console.log(`You are currently in ${currentDir}`);
    } else if (command.startsWith('rm ')) {
        await removeFile(currentDir, command.slice(3))
        console.log(`You are currently in ${currentDir}`);
    } else if (command === '.exit') {
        rl.close();
    } else {
        console.log(`Invalid input`);
        console.log(`You are currently in ${currentDir}`);
    }
}

import { getFilesList } from "./getFilesList.js";
import { getHomeDir } from "./getHomeDir.js";
import { rl } from "./index.js";
import { getContent } from "./readFile.js";
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
    } else if (command === '.exit') {
        rl.close();
    } else {
        console.log(`Invalid input`);
    }
}

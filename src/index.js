import { createInterface } from 'node:readline';
import { getUserName } from './getUserName.js';
import { processUserCommand, currentDir } from './processUserCommand.js';

export const rl = createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log(`Welcome to the File Manager, ${getUserName()}!`);
console.log(`You are currently in ${currentDir}`);

process.on('SIGINT', () => {
    console.log(`Thank you for using File Manager, ${getUserName()}, goodbye!`);
    process.exit();
});

rl.setPrompt('> ');
rl.prompt();

rl.on('line', (input) => {
    processUserCommand(input.trim());
    rl.prompt();
});

rl.on('close', () => {
    console.log(`Thank you for using File Manager, ${getUserName()}, goodbye!`);
    process.exit();
});



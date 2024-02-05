import os from 'node:os';

export function getOSinfo(param) {
    if (param === 'EOL') {
        console.log(`Default End-Of-Line (EOL) for the current system: ${JSON.stringify(os.EOL)}`);
    } else if (param === 'cpus') {
        const cpus = os.cpus();
        
        console.log(`Overall CPUs: ${cpus.length}`);

        cpus.forEach((cpu, index) => {
            console.log(`\nCPU ${index + 1}:`);
            console.log(`  Model: ${cpu.model}`);
            console.log(`  Speed: ${cpu.speed / 1000} GHz`);
        });
    } else if (param === 'homedir') {
        console.log(`Home Directory: ${os.homedir()}`);
    } else if (param === 'username') {
        console.log(`Current System User: ${os.userInfo().username}`);
    } else if (param === 'architecture') {
        console.log(`CPU Architecture: ${os.arch()}`);
    } else {
        console.error('Operation failed');
    }
}


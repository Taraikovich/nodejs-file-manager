export function getUserName() {
    const args = process.argv;
    const username = args.filter((item) => item.includes('--username'))[0];
    if (username) {
        return username.slice(11);
    } else {
        return 'Unknown_User'
    }
}

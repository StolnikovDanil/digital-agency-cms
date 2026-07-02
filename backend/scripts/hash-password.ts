import * as bcrypt from "bcrypt";

const password = process.argv[2];

if (!password) {
    console.error("Usage: tsx scripts/hash-password.ts <password>");
    process.exit(1);
}

const SALT_ROUNDS = 10;

bcrypt.hash(password, SALT_ROUNDS).then((hash) => {
    console.log("\nДобавь это в .env как ADMIN_PASSWORD_HASH:\n");
    console.log(hash);
    console.log();
});
import mysql, { ConnectionOptions } from 'mysql2/promise'

let pool: mysql.Pool;

export async function ConnectToDatabase(){
    const vars = ["DB_DATABASE", "DB_HOSTNAME", "DB_USERNAME", "DB_PASSWORD"];
    for(const varName of vars) {
        if(typeof process.env[varName] === 'undefined') {
            throw new Error(`Missing ${varName} env variable`);
        }
    }
    if (!pool) {
      pool = mysql.createPool({
        host: process.env.DB_HOSTNAME!,
        user: process.env.DB_USERNAME!,
        password: process.env.DB_PASSWORD!,
        database: process.env.DB_DATABASE!,
      });
    }
    return pool
}

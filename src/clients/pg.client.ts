import knex from "knex";

export const pg= knex({
    client: "pg",
    connection: {
      host: "localhost",
      user: "postgres",
      password: "120000",
      port: 5432,
      database: "user_management",
    },
})

pg.on('connection', (stream)=>
console.log("connect pg"))
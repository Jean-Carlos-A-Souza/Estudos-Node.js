import { Pool } from "pg";

const connectionString = 'postgres://tzzovwxq:EFaUDvnqLW-harpVoPV4aNB_QMWeptBL@motty.db.elephantsql.com/tzzovwxq'

const db = new Pool({connectionString})


export default db;
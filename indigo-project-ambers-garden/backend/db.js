// db.js
const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();


const pool = new Pool({
  user: 'postgres.uzsjzfosugegygpzpbtc',
  host: 'aws-0-us-east-1.pooler.supabase.com',
  database: 'postgres',
  password: process.env.VITE_SUPABASE_PASSWORD,
  port: '6543',
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;
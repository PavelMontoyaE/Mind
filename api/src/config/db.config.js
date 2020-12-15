export const HOST = '172.19.0.1';
export const PORT = '3306';
export const USER = 'admin';
export const PASSWORD = 'p4ssw0rd';
export const DB = 'db';
export const dialect = 'mysql';
export const pool = {
  max: 5,
  min: 0,
  acquire: 30000,
  idle: 30000
};

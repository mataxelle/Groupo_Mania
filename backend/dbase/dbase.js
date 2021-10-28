const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('groupo_mania', 'root', process.env.D_BASE_PASS, {
    host: 'localhost',
    dialect: 'mysql',
    pool: {     // is optional, it will be used for Sequelize connection pool configuration:
        max: 5,   // maximum number of connection in pool
        min: 0,   // minimum number of connection in pool
        acquire: 30000,  //maximum time, in milliseconds, that pool will try to get connection before throwing error
        idle: 10000         // maximum time, in milliseconds, that a connection can be idle before being released
    }
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });


module.exports = sequelize;
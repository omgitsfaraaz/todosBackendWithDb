import { Sequelize } from "sequelize"

export const sequelize =  new Sequelize('access', 'root', 'Mohsin@123', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
})
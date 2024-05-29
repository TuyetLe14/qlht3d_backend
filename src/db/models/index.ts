import { Sequelize } from 'sequelize'

const config = require(`${__dirname}/../../../config/database.js`)[process.env.NODE_ENV || 'development']

let sequelize: Sequelize

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable] as string, config)
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config)
}

export default sequelize

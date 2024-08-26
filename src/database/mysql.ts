import { Sequelize } from 'sequelize';

// Set up Sequelize
const sequelize = new Sequelize('qr_generator', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

export default sequelize;

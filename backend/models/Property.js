const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('node_live_db', 'tinec', '123456', {
    host: 'localhost',
    dialect: 'postgres',
    port: 5342
});

const Property = sequelize.define('property', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: Sequelize.STRING,
    image_urls: Sequelize.ARRAY(Sequelize.DataTypes.STRING),
});

module.exports = Property;

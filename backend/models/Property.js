const {Sequelize} = require('sequelize');
const config = require('../../config')['development'];
const sequelize = new Sequelize(config.postgres.options);

const Property = sequelize.define('property', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: Sequelize.STRING,
    image_urls: Sequelize.ARRAY(Sequelize.DataTypes.STRING),
}, {
    tableName: 'properties',
    freezeTableName: true,
});

Property.sync()
    .then(() => {
        console.log('Property table created successfully.');
    })
    .catch(err => {
        console.error('Error creating Property table:', err);
    });


module.exports = Property;

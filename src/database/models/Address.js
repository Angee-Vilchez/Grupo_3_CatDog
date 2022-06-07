module.exports = (sequelize, dataTypes) => {
    let alias = "Address";

    let cols = {
        id: {
            type: dataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        street: {
            type: dataTypes.STRING(50),
            allowNull: false,
        },
        number: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        province: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        city: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: dataTypes.STRING(100),
        }, 
    };

    let config = {
        tableName: "addresses",
        timetamps: false,
    };

    const Address = sequelize.define(alias, cols, config);

    Address.associate = (models)  => {
        Address.belongsTo(models.User, {
            as: "User",
            foreignKey: "User_id",
        });
    };

    return Address;
};
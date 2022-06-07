
module.exports = (sequelize, DataTypes) => {
    let alias = "UserRol";

    let cols = {
        id: {
            type: dataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        rol_name: {
            type: dataTypes.STRING(45),
            allowNull: false,
        },
    };

    let config = {
        tableName: "users_rols",
        timestamps: false,
    };

    const UserRol = sequelize.define(alias, cols, config);

    UserRol.associate = (models) => {
        UserRol.hasMany(models.User, {
            as: "users",
            foreignKey: "rol_id"
        })
    }

    return UserRol;
}
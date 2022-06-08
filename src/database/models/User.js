module.exports = (sequileze, dataTypes) => {
    let alias = "User";

    let cols = {
        id: {
            type: dataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: dataTypes.STRING(20),
            allowNull: false,
        },
        rol_id: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
        },
        userName: {
            type: dataTypes.STRING(20),
            allowNull: false,
        },
        email: {
            type: dataTypes.STRING(45),
            allowNull: false,
        },
        password: {
            type: dataTypes.STRING(70),
            allowNull: false,
        },
        avatar: {
            type: dataTypes.STRING(45),
        }
    };

    let config = {
        tableName: "Users",
        timetamps: false,
    };

    const User = sequileze.define(alias, cols, config);

    User.associate = (models)  => {
        User.belongsTo(models.UserRol, {
            as: "rol",
            foreignKey: "User_id",
        })
        User.hasmany(models.Address, {
            as: "addresses",
            foreignKey: "User_id",
        });
    };

    return User;
}
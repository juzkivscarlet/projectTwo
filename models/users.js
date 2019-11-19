module.exports = function(sequelize, DataTypes) {
    var Users = sequelize.define("Users", {
        username: {
            type: DataTypes.STRING
        },
        password_hash: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING
        }
    });

    return Users;
};
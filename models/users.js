module.exports = function(sequelize, DataTypes) {
    var Users = sequelize.define("Users", {
        username: {
            type: DataTypes.STRING
        }, 
        password_hash: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.VIRTUAL,
            set: function(val) {
                this.setDataValue('password', val);
                this.setDataValue('password_hash', this.salt+val);
            },
            validate: {
                isLongEnough: function(val) {
                    if(val.length<8) {
                        throw new Error("Please choose longer password");
                    }
                }
            }
        }
    });

    return Users;
};
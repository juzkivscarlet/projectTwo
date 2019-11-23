module.exports = (sequelize, DataTypes) => {
    var Events = sequelize.define("Events", {
        user: {
            type: DataTypes.STRING,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dateBegin: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        dateEnd: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        timeBegin: {
            type: DataTypes.TIME,
            allowNull: true
        },
        timeEnd: {
            type: DataTypes.TIME,
            allowNull: true
        },
        frequency: {
            type: DataTypes.STRING,
            allowNull: true
        },
        location: {
            type: DataTypes.STRING,
            allowNull: true
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });

    Events.setAllDay = function() {
        console.log("test");
    };

    return Events;
};
import { DataTypes } from 'sequelize'
import { sequelize } from '../config/database.js'

const Exercise = sequelize.define('Exercise', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    muscleGroup: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isOfficial: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    createdBy: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
            model: 'Users',
            key: 'id'
        }
    }    
}, {
    timestamps: true
    }
)

export default Exercise


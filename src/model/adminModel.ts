import { DataTypes, ModelDefined, Optional } from 'sequelize';
import sequelize from '../config/db';

interface AdminAttributes {
  id: string;
  email: string;
  username: string;
  password: string;
  role: string;  // Added role attribute
}

interface AdminCreationAttributes extends Optional<AdminAttributes, 'id'> {}

const Admin: ModelDefined<AdminAttributes, AdminCreationAttributes> = sequelize.define(
  'Admin',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'admin', 
    },
  },
  {
    tableName: 'admins',
    timestamps: true,
  }
);

export default Admin;

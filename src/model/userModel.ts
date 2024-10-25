import { DataTypes, ModelDefined, Optional } from 'sequelize';
import sequelize from '../config/db';

interface UserAttributes {
  id: string;
  companyName: string;
  address?: string;
  phoneNumber?: string;
  industry: string;
  panNumber: string;
  email: string;
  role: 'admin' | 'user'; 
  creatorId: string; // Reference to Admin who created the User
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

const User: ModelDefined<UserAttributes, UserCreationAttributes> = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    companyName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    industry: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    panNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    role: {
      type: DataTypes.ENUM('admin', 'user'), 
      allowNull: false,
      defaultValue: 'user',
    },
    creatorId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'admins', // Refers to Admin table
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  },
  {
    tableName: 'users',
    timestamps: true,
  }
);

export default User;

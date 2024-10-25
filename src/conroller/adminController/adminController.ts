import Admin from '../../model/adminModel';
import { Request, Response } from 'express';
import { hashPassword } from '../../util/bcrypt/hashPassword';
import { generateToken } from '../../util/jwt/generateToken';
import { comparePassword } from '../../util/bcrypt/comparePassword';
import User from '../../model/userModel';
import Client from '../../model/clientModel';

interface AdminAttributes {
  id: number;
  email: string;
  username: string;
  password: string; 
  role: string;
}


export const createAdmin = async (req: Request, res: Response): Promise<any> => {
  req.body.password = await hashPassword(req.body.password)
  const { email, username, password } = req.body;
  
  console.log('this is data',password);
  
  try {
   
    if (!email || !username || !password) {
      return res.status(400).json({
        message: 'Email, username, and password are required',
      });
    }


    const newAdmin = await Admin.create({
      email,
      username,
      password,
      role:'admin'
    });

    if(newAdmin){
      const token = generateToken({email,password,role:'admin'});
     
     
     res.cookie('token', token, {
       httpOnly: true, 
       maxAge: 3600000, 
     });
    }


    return res.status(201).json({
      message: 'Admin created successfully',
      admin: newAdmin,
    });
    
  } catch (error: any) {
    console.error('Error creating admin:', error);
    return res.status(500).json({
      message: 'Failed to create admin',
      error: error.message,
    });
  }
};


export const loginAdmin = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;

  try {
   
    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password are required',
        success:false
      });
    }

    
    const admin : AdminAttributes | any = await Admin.findOne({ where: { email } });
    
    
    if (!admin) {
      return res.status(404).json({
        message: 'Admin not found',
        success:false
      });
    }

    
    const isPasswordValid = await comparePassword(password,admin.password);
    
    
    if (!isPasswordValid) {
      return res.status(401).json({
        message: 'Invalid password',
        success:false ,
      });
    }

    
    const token = generateToken({
      email: admin.email,
      id: admin.id,
      role: admin.role
    });

    
    res.cookie('token', token, {
      httpOnly: true, 
      maxAge: 3600000, 
    });

  
    return res.status(200).json( { 
      success: true,
      data:admin,
      message: " Login successful", 
  } )

  } catch (error: any) {
    console.error('Error during login:', error);
    return res.status(500).json({
      message: 'Failed to login',
      error: error.message,
    });
  }
};


export const getAdmins = async (req: Request, res: Response): Promise<any> => {
  try {
    const admins = await Admin.findAll();

    return res.status(200).json({
      message: 'Admins retrieved successfully',
      admins,
    });
  } catch (error: any) {
    console.error('Error retrieving admins:', error);
    return res.status(500).json({
      message: 'Failed to retrieve admins',
      error: error.message,
    });
  }
};


export const getAdminByEmail = async (req: Request, res: Response): Promise<any> => {
  const { email } = req.params; 

  try {

    const admin = await Admin.findOne({ where: { email } });

    if (!admin) {
      return res.status(404).json({
        message: 'Admin not found',
        status:false
      });
    }

    return res.status(200).json({
      message: 'Admin retrieved successfully',
      admin,
      status:true
    });
  } catch (error: any) {
    console.error('Error retrieving admin:', error);
    return res.status(500).json({
      message: 'Failed to retrieve admin',
      error: error.message,
    });
  }
};


export const getUserDataByRole = async (req: Request, res: Response) : Promise<any> => {
  const { role }: any = req.user; 

  let data;

  try {
    switch (role) {
      case 'admin':
        data = await Admin.findAll(); 
        break;
      case 'user':
        data = await User.findAll(); 
        break;
      case 'client':
        data = await Client.findAll(); 
        break;
      default:
        return res.status(400).json({
          message: 'Role not recognized',
        });
    }

    return res.status(200).json({
      message: 'User data retrieved successfully',
      data,
      success:true
    });
  } catch (error: any) {
    console.error('Error retrieving user data:', error);
    return res.status(500).json({
      message: 'Failed to retrieve user data',
      error: error.message,
      success:false
    });
  }
};
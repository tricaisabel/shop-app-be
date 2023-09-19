import User from '../models/user.model'
import mongoose from 'mongoose'
import { UserData } from '../types/user-data.type';

export const signUp = async (userData: UserData) => {
    const savedUser = await User.create({
        _id: new mongoose.Types.ObjectId(),
        email: userData.email,
        password: userData.password,
        url: userData.url
    })
    return savedUser;
}

export const validateNewUser = async (email: string, password: string): Promise<void>=>{
    const emailExists = await User.exists({email})

    if(emailExists){
        throw new Error('This email is already in use');
    }

    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        email: email,
        password: password,
        url: 'url'
    })

    await user.validate();
}

export const checkUserExists = async(userId: string): Promise<void>=>{
    const objectIdPattern = /^[0-9a-fA-F]{24}$/;
    if(!objectIdPattern.test(userId)){
        throw new Error('Please provide a valid ObjectId for userId')
    }
    
    let userExists = await User.exists({_id: userId})
    if(!userExists){
        throw new Error("User with given id doesn't exist")
    }
}

export const logIn = (req: Request, res: Response) => {
    console.log('login')
}

export const logOut = (req: Request, res: Response) => {
    console.log('logout')
}
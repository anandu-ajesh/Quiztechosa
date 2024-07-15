import { User } from "@/models/user";
import mongoose from "mongoose";
import { signIn } from "next-auth/react";
import { NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'



export async function POST(request){
    try {
        await mongoose.connect(process.env.MONGO_URI)
        const { username, password } = await request.json()
        // const salt = await bcryptjs.genSalt(5);
        // const hash = await bcryptjs.hash(password, salt)
        const user = await User.findOne({username})
        if(user){
            return NextResponse.json({message: 'user already exists'})
        }
        const newUser = new User({
            username,
            password
        })

        await newUser.save();

        return NextResponse.json({
            message: "User Created",
            status: 200,
          });

    } catch (error) {
        NextResponse.json({message: "Internal server error", status: 500, error})
    }
}
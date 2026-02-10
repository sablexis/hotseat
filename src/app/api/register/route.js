import User from "@/app/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/db";

export async function POST(req){
    try{
        // Connect to database
        await dbConnect();

        const body = await req.json();
        const userData = body.formData;

        // Confirm all required fields exist
        if(!userData?.email || !userData?.username || !userData?.password){
            return NextResponse.json({message: "Email, username, and password are required"}, {status: 400});
        }

        // Check for duplicate email or username
        const duplicate = await User.findOne({
            $or: [
                { email: userData.email },
                { username: userData.username }
            ]
        })
            .lean()
            .exec();

        if (duplicate){
            const field = duplicate.email === userData.email ? "Email" : "Username";
            return NextResponse.json({
                message: `${field} already exists`},
                {status: 409}
            );
        }

        // Hash password
        const hashPassword = await bcrypt.hash(userData.password, 10);
        userData.password = hashPassword;

        // Create user
        await User.create(userData);
        return NextResponse.json({
            message: "User created successfully"},
            {status: 201}
        );

    }catch(error){
        console.log(error);
        return NextResponse.json({message: "Error creating user", error: error.message}, {status: 500});
    }

}
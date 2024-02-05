import User from "@/app/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req){
    try{
        const body = await req.json();
        const userData = body.formData
        
        //confirm existence
        if(!userData?.email || !userData.password){
            return NextResponse().json({message: "All fields required", err}, {status: 400});
        }

        //check duplicates
        const duplicates = await User.findOne({email: userData.email})
            .lean()
            .exec();

        if (duplicates){
            return NextResponse.json({
                message: "Duplicate Email"},
                {status: 409}
            );
        }

        const hashPassword = await bcrypt.hash(userData.password, 10)
        userData.password = hashPassword;

        await User.create(userData)
        return NextResponse.json({
            message: "User Created"},
            {status: 201}
        );


    }catch(error){
        console.log(error)
        return NextResponse().json({message: "Error", err}, {status: 500});
    }
    
}
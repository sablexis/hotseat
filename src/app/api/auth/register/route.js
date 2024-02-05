import { NextResponse } from "next/server";

export  async function POST(req){
    try{
        const {email, password} = await req.json();

    }catch(error){
        console.log(error)}

    return new NextResponse().json("success")
}
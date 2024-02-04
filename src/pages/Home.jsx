import React from "react";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

export default async function StartPage(){
    const session = await getServerSession(options);

    return(
        <div>
            Home
            
        </div>
    )
}
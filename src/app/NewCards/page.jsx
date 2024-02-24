import React from "react";
import NewCardInputForm from "@/components/newCardInputForm";
import Link from "next/link";

export default function NewCards(){

    return(
        <div>
            <NewCardInputForm/>
            <Link href = "/Member">Back</Link>
        </div>
    )

}
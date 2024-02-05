import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import {options} from "./options";

const handler =  NextAuth(options)
export {handler as GET, handler as POST}


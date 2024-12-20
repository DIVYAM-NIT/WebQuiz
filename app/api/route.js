import { NextResponse } from "next/server";
import { NewUser } from "../../lib/models/model";
import mongoose from "mongoose";
 
export async function GET(request){
    await mongoose.connect(process.env.MONGOURL);
    const data=await NewUser.find({});
    console.log(data);
    return NextResponse.json({result: "true",data: data});
}
import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Registration from "@/lib/models/Registration";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { phone } = body;

    if (!phone) {
      return NextResponse.json({ error: "Phone number is required" }, { status: 400 });
    }

    await connectToDatabase();

    try {
      await Registration.create({ phone });
      console.log("New Early Access Registration saved to DB:", phone);
    } catch (dbError: any) {
      // Handle duplicate key error (code 11000)
      if (dbError.code === 11000) {
        return NextResponse.json({ success: true, message: "Already registered" }, { status: 200 });
      }
      throw dbError;
    }

    return NextResponse.json({ success: true, message: "Successfully registered" }, { status: 200 });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

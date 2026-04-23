import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { phone } = body;

    if (!phone) {
      return NextResponse.json({ error: "Phone number is required" }, { status: 400 });
    }

    // TODO: Connect to your database or CRM (e.g., Supabase, Prisma, Mailchimp, etc.)
    // For now, we just log it to the server console.
    console.log("New Early Access Registration:", phone);

    return NextResponse.json({ success: true, message: "Successfully registered" }, { status: 200 });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

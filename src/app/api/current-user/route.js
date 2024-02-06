import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { sql } from "@vercel/postgres";




export async function GET(request) {
  
  try {
    
    const token = request.cookies.get("JwtToken")?.value;

    if (!token) {
      return NextResponse.json({ error: "Token not provided" }, { status: 401 });
    }

    const data = jwt.verify(token, process.env.JWT_KEY);
   

    if (!data || !data.userID) {
      return NextResponse.json({ error: "Invalid token data" }, { status: 401 });
    }
   
    const user = await sql`SELECT * FROM users WHERE id=${data.userID}`;
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user.rows);
  } catch (error) {
    console.error("Error verifying token:", error);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
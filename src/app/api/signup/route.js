import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import bcrypt from "bcrypt";

export async function POST(request) {
  const { name, email, password } = await request.json();

  try {
    const hashedPassword = await bcrypt.hashSync(password, parseInt(process.env.BCRYPT_SALT));
    const addedUser = await sql`INSERT INTO users (name, email, password)
    VALUES (${name}, ${email}, ${hashedPassword});
    `;

    console.log(addedUser);

    return NextResponse.json(addedUser);
    
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
        success: false,
      },
      {
        status: 401,
      }
    );
  }
}

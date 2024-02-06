import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

export async function POST(request) {
  const { email, password } = await request.json();

  try {
    const user = await sql`SELECT * FROM users WHERE Email= ${email}`;
    const pwd = user.rows[0]?.password;
    const userName = user.rows[0]?.name;
    const userID = user.rows[0]?.id;
    const filteredResponse = {
      ...user,
      rows: user.rows.map(({ password, ...rest }) => rest),
    };

    const matched = bcrypt.compareSync(password, pwd);

    if (matched) {
      const token = Jwt.sign(
        {
          userID: userID,
          name: userName,
        },
        process.env.JWT_KEY
      );

      const response = NextResponse.json({
        message: "Logged In successfully",
        success: true,
        user: filteredResponse,
      });

      response.cookies.set("JwtToken", token, { expiresIn: "1d" });

      return response;
    } else {
      throw new Error("Email ID or Password is incorrect");
    }
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

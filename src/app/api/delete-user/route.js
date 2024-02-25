import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function DELETE(request) {
  
  try {
    const { email } =await request.json();
    console.log(email)
    await sql`DELETE FROM users WHERE Email= ${email}`;
    return NextResponse.json({ message: "User Deleted!", success: true },{
        status:200
    });
  } catch (error) {
    // console.log(error)
    return NextResponse.json({
      message: "unexpected error occured",
      success: false
    },{
        status:500
    });
  }
}

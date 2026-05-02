import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      code: "NOT_IMPLEMENTED",
      message:
        "La creacion real de payment orders se implementara despues del bootstrap del proyecto."
    },
    { status: 501 }
  );
}

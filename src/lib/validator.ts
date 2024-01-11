import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";

export const validateSchema = (schema: z.ZodType<any, any>) => async (req: NextRequest, next: Function) => {
  const response = schema.safeParse(req.body);

  if (response.success) {
    return next(req.body);
  } else {
    console.log(response);
    return new NextResponse(JSON.stringify({ error: "Invalid shit you sending to server" }), { status: 400 });
  }
};

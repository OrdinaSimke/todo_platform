import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  console.log('teste');
  return NextResponse.json(
    { message: 'Product name is missing' },
    { status: 307 }
  );
}

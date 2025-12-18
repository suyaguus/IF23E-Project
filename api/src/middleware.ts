import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // 1. Definisikan header CORS
  const headers = new Headers({
    "Access-Control-Allow-Origin": "*", // Atau domain frontend spesifik
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  });

  // 2. Handle OPTIONS (Preflight)
  if (request.method === "OPTIONS") {
    return NextResponse.json({}, { headers: headers, status: 200 });
  }

  // 3. Teruskan request dengan header CORS
  const response = NextResponse.next();

  // Salin header CORS ke response asli
  headers.forEach((value, key) => {
    response.headers.set(key, value);
  });

  return response;
}

export const config = {
  matcher: "/api/:path*",
};
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return {
      status: 401,
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    status: 200,
  };
}

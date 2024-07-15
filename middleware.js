import { withAuth } from "next-auth/middleware";

export default withAuth(
  async function middleware(request) {
    const path = request.nextUrl.pathname;
    const token = await request.nextauth.token;
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  },
);

export const config = {
  matcher: ["/dashboard/:path*"],
};
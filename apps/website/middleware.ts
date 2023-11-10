import {NextRequest, NextResponse} from "next/server";
import {verifyJwtToken} from "./libs/auth";

const AUTH_PAGES = ["/login", "/register"];

const isAuthPages = (url: string) => AUTH_PAGES.some((page) => page.startsWith(url) && url !== '/');

export async function middleware(request: NextRequest) {
  const {url, nextUrl, cookies} = request;
  const {value: token} = cookies.get("token") ?? {value: null};

  const domainUrl = request.headers.get("Host");
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  /*
  const data = await(await fetch(apiUrl + "/domains/url/" + domainUrl)).json();

  if (data.statusCode === 404) {
    return NextResponse.redirect(new URL(`/error`, url));
  }
   */

  const hasVerifiedToken = token && (await verifyJwtToken(token));
  const isAuthPageRequested = isAuthPages(nextUrl.pathname);

  if (isAuthPageRequested) {
    if (!hasVerifiedToken) {
      const response = NextResponse.next();
      response.cookies.delete("token");
      return response;
    }

    return NextResponse.redirect(new URL(`/`, url));
  }

  if (!hasVerifiedToken) {
    const searchParams = new URLSearchParams(nextUrl.searchParams);
    searchParams.set("next", nextUrl.pathname);

    const response = NextResponse.redirect(
      nextUrl.pathname !== '/' ? new URL(`/login?${searchParams}`, url) : new URL(`/login`, url)
    );
    response.cookies.delete("token");

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|error|favicon.ico|robots.txt|images).*)',
  ],
};

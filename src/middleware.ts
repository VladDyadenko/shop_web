import  {type NextRequest, NextResponse } from "next/server"
import { EnumTokens } from "./services/auth/auth-token.service"
import { PUBLIC_URL } from "./config/url.config"

// export async function middleware(request: NextRequest){
//     const refreshToken = request.cookies.get(EnumTokens.REFRESH_TOKEN)?.value
    

//     const allCookies = request.cookies.getAll();
//     console.log("🚀 ~ All cookies:", allCookies);
//      // Шукайте refreshToken серед всіх cookies
//      const refreshTokenCookie = allCookies.find(cookie =>
//         cookie.name.includes('refresh') ||
//         cookie.name.includes('Refresh')
//     );
    
//     console.log("🚀 ~ Found refresh cookie:", refreshTokenCookie);

//     const isAuthPage = request.url.includes(PUBLIC_URL.auth())
    
//     if (isAuthPage) {
//         if (refreshToken) {
//             return NextResponse.redirect( new URL(PUBLIC_URL.home(), request.url))
//         }
//         return NextResponse.next()
//     }

//     if (refreshToken === undefined) {
//         return NextResponse.redirect(new URL(PUBLIC_URL.auth(), request.url))
//     }

//     return NextResponse.next()
// }

// export const config = {
//     matcher: ['/dashboard/:path*', '/store/:path*', '/auth']
// }

// Тимчасово спростіть middleware

// Варіант 2

// export async function middleware(request: NextRequest) {
//     const { pathname } = request.nextUrl;
    
//     // Тільки для auth сторінки
//     if (pathname === '/auth') {
//         const refreshToken = request.cookies.get(EnumTokens.REFRESH_TOKEN)?.value;
//         const accessToken = request.cookies.get(EnumTokens.ACCESS_TOKEN)?.value;
        
//         if (refreshToken || accessToken) {
//             return NextResponse.redirect(new URL('/dashboard', request.url));
//         }
//     }
    
//     // Для всього іншого - дозволити
//     return NextResponse.next();
// }

// export const config = {
//     matcher: ['/auth'] // ← Тільки для auth сторінки
// }

// Варіант 3

// Middleware тільки для auth сторінки
export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    
    // Тільки перевіряйте auth сторінку
    if (pathname === '/auth') {
        const refreshToken = request.cookies.get(EnumTokens.REFRESH_TOKEN)?.value;
        const accessToken = request.cookies.get(EnumTokens.ACCESS_TOKEN)?.value;
        
        if (refreshToken || accessToken) {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }
    }
    
    return NextResponse.next();
}

export const config = {
    matcher: ['/auth'] // Тільки для auth
}
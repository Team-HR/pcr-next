import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname
    const isPublicPath = path === '/login' || path === '/signup'
    const token = request.cookies.get('XSRF-TOKEN')?.value || ''

    // Redirect logic
    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }
    
    // Allow access to public paths or if authenticated
    return NextResponse.next()
}

// Specify the paths middleware should run on
export const config = {
    matcher: ['/dashboard', '/dashboard/:path*']
}
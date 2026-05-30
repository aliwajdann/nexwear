import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { createClerkClient } from '@clerk/backend';

// ✅ Make sure these are EXACT emails (all lowercase, no spaces)
const adminEmails = ['aliwajdan.it@gmail.com', 'mominabbasminhas5@gmail.com'];

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY!,
});

export default clerkMiddleware(async (auth, req) => {
  const session = await auth();

  // ✅ Protect only /admin routes
  if (req.nextUrl.pathname.startsWith('/admin')) {
    if (!session.userId) {
      return NextResponse.redirect(new URL('/sign-in', req.url));
    }

    try {
      const user = await clerkClient.users.getUser(session.userId);
      const email = user?.emailAddresses?.[0]?.emailAddress;

      if (!email || !adminEmails.includes(email.toLowerCase())) {
        return NextResponse.redirect(new URL('/', req.url)); // ❌ Not allowed
      }
    } catch (error) {
      console.error('❌ Clerk user fetch error:', error);
      return NextResponse.redirect(new URL('/sign-in', req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)'], // Apply to all dynamic routes
};

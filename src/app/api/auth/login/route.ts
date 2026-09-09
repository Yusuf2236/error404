import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { SignJWT } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || 'fallback-secret-for-dev-only-do-not-use-in-prod'
);

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password } = body;

        const VALID_EMAIL = "admin@vipuzbe.com";
        const VALID_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

        if (email === VALID_EMAIL && password === VALID_PASSWORD) {
            // Create a secure JWT
            const token = await new SignJWT({
                email: VALID_EMAIL,
                role: 'admin'
            })
                .setProtectedHeader({ alg: 'HS256' })
                .setIssuedAt()
                .setExpirationTime('24h')
                .sign(JWT_SECRET);

            const cookieStore = await cookies();
            cookieStore.set('admin_token', token, {
                httpOnly: true,
                secure: true, // Always use secure in this context for demonstration
                sameSite: 'strict',
                maxAge: 60 * 60 * 24 // 1 day
            });

            return NextResponse.json({
                success: true,
                user: {
                    id: 'admin_1',
                    name: 'Admin User',
                    email: VALID_EMAIL,
                    role: 'admin'
                }
            });
        }

        return NextResponse.json(
            { error: 'Invalid credentials' },
            { status: 401 }
        );
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

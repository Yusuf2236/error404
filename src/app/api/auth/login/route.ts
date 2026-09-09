import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { SignJWT } from 'jose';

// Fail closed: no publicly-known fallback secret/password may be baked into the
// source — that would make admin forgery / login trivial.
const RAW_SECRET = process.env.JWT_SECRET;
const JWT_SECRET = RAW_SECRET ? new TextEncoder().encode(RAW_SECRET) : null;

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password } = body;

        const VALID_EMAIL = "admin@vipuzbe.com";
        const VALID_PASSWORD = process.env.ADMIN_PASSWORD;

        if (!JWT_SECRET || !VALID_PASSWORD) {
            console.error('Auth misconfigured: JWT_SECRET and/or ADMIN_PASSWORD not set');
            return NextResponse.json({ error: 'Server auth not configured' }, { status: 500 });
        }

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

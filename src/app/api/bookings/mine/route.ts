import { NextResponse } from 'next/server';
import { getBookings } from '@/lib/db';

// Guest-facing: returns the bookings that belong to the given email. The caller
// supplies their own email, so this is intentionally public (no admin token).
// Allowed past the admin guard in middleware.ts.
export async function OPTIONS() {
    return new NextResponse(null, { status: 204 });
}

export async function GET(request: Request) {
    const email = new URL(request.url).searchParams.get('email')?.trim().toLowerCase();
    if (!email) {
        return NextResponse.json({ error: 'email query param required' }, { status: 400 });
    }
    try {
        const mine = getBookings()
            .filter((b) => b.email.toLowerCase() === email)
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        return NextResponse.json(mine);
    } catch {
        return NextResponse.json({ error: 'Failed to load bookings' }, { status: 500 });
    }
}

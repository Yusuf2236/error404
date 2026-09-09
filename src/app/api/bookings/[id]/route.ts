import { NextResponse } from 'next/server';
import { updateBookingStatus } from '@/lib/db';

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> } // Fix for Next.js 15+ async params
) {
    try {
        const { id } = await params;
        const body = await request.json();

        if (!body.status) {
            return NextResponse.json(
                { error: 'Status is required' },
                { status: 400 }
            );
        }

        const updatedBooking = updateBookingStatus(id, body.status);

        if (!updatedBooking) {
            return NextResponse.json(
                { error: 'Booking not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(updatedBooking);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to update booking' },
            { status: 500 }
        );
    }
}

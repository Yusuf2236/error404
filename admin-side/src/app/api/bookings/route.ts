import { NextResponse } from 'next/server';
import { getBookings, addBooking } from '@/lib/db';

export async function GET() {
    try {
        const bookings = getBookings();
        return NextResponse.json(bookings);
    } catch {
        return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Validate required fields
        if (!body.checkIn || !body.checkOut || !body.name || !body.email) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Calculate mock price based on room type
        const prices: Record<string, number> = {
            'platinum': 550,
            'heritage': 2500,
            'minor': 950,
            'chorsu': 380,
            'deluxe-suite': 350
        };

        const checkInDate = new Date(body.checkIn);
        const checkOutDate = new Date(body.checkOut);

        if (checkOutDate <= checkInDate) {
            return NextResponse.json(
                { error: 'Check-out must be after check-in' },
                { status: 400 }
            );
        }

        const pricePerNight = prices[body.roomType] || 400;
        const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)) || 1;
        const totalPrice = pricePerNight * nights;

        const newBooking = addBooking({
            customerName: body.name,
            email: body.email,
            phone: body.phone,
            checkIn: body.checkIn,
            checkOut: body.checkOut,
            guests: parseInt(body.guests),
            roomType: body.roomType,
            paymentMethod: body.paymentMethod || 'cash',
            totalPrice
        });

        return NextResponse.json(newBooking, { status: 201 });
    } catch (error) {
        console.error('Booking error:', error);
        return NextResponse.json(
            { error: 'Failed to create booking' },
            { status: 500 }
        );
    }
}

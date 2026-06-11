import { NextResponse } from 'next/server';
import { getOccupiedRooms } from '@/lib/db';

export async function GET() {
    try {
        const occupied = getOccupiedRooms();
        return NextResponse.json({ occupied });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch availability' }, { status: 500 });
    }
}

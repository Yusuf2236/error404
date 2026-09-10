import fs from 'fs';
import path from 'path';

export interface Booking {
    id: string;
    customerName: string;
    email: string;
    phone: string;
    checkIn: string;
    checkOut: string;
    guests: number;
    roomType: string;
    paymentMethod: 'click' | 'payme' | 'visa' | 'cash';
    paymentProvider?: string; // e.g. "Click Merchant", "Payme Checkout"
    assignedStaff?: string;    // e.g. "Jamshid - Front Desk"
    status: 'pending' | 'confirmed' | 'cancelled' | 'paid';
    totalPrice: number;
    createdAt: string;
}

// SHARED database file. The admin panel runs from ./admin-side, so by default we
// reach up one level into the customer site's data file. This makes a booking made
// on the public site instantly visible to the admin (and vice-versa).
// Override with BOOKINGS_DB_PATH to point both apps at the same custom location.
export const DB_PATH = process.env.BOOKINGS_DB_PATH
    ? path.resolve(process.env.BOOKINGS_DB_PATH)
    : path.join(process.cwd(), '..', 'src', 'app', 'data', 'bookings.json');

// Ensure the data directory exists
const ensureDbExists = () => {
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(DB_PATH)) {
        fs.writeFileSync(DB_PATH, JSON.stringify([], null, 2));
    }
};

export const getBookings = (): Booking[] => {
    ensureDbExists();
    const fileContent = fs.readFileSync(DB_PATH, 'utf-8');
    try {
        return JSON.parse(fileContent);
    } catch {
        return [];
    }
};

export const addBooking = (booking: Omit<Booking, 'id' | 'createdAt' | 'status'>): Booking => {
    const bookings = getBookings();
    const newBooking: Booking = {
        ...booking,
        id: `BK-${Date.now().toString().slice(-6)}`,
        status: 'pending',
        createdAt: new Date().toISOString(),
    };

    bookings.push(newBooking);
    fs.writeFileSync(DB_PATH, JSON.stringify(bookings, null, 2));
    return newBooking;
};

export const updateBookingStatus = (id: string, status: Booking['status']): Booking | null => {
    const bookings = getBookings();
    const index = bookings.findIndex(b => b.id === id);

    if (index === -1) return null;

    bookings[index].status = status;
    fs.writeFileSync(DB_PATH, JSON.stringify(bookings, null, 2));
    return bookings[index];
};

export const getOccupiedRooms = (): string[] => {
    const bookings = getBookings();
    const today = new Date().toISOString().split('T')[0];

    return bookings
        .filter(b =>
            (b.status === 'confirmed' || b.status === 'paid') &&
            b.checkIn <= today && b.checkOut >= today
        )
        .map(b => b.roomType);
};

export const getStats = () => {
    const bookings = getBookings();
    const totalRevenue = bookings
        .filter(b => b.status === 'paid' || b.status === 'confirmed')
        .reduce((sum, b) => sum + (b.totalPrice || 0), 0);

    const paymentMethods = bookings
        .filter(b => b.status === 'paid' || b.status === 'confirmed')
        .reduce((acc, b) => {
            const method = b.paymentMethod;
            if (method) {
                acc[method] = (acc[method] || 0) + (b.totalPrice || 0);
            }
            return acc;
        }, {} as Record<string, number>);

    // Active bookings include both confirmed and paid statuses
    const activeBookings = bookings.filter(b => b.status === 'confirmed' || b.status === 'paid').length;

    return {
        totalBookings: bookings.length,
        activeBookings,
        pendingBookings: bookings.filter(b => b.status === 'pending').length,
        totalRevenue,
        paymentMethods
    };
};

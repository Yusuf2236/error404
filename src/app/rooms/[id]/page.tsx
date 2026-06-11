import RoomClient from "./RoomClient";

export default async function RoomDetails({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <RoomClient id={id} />;
}

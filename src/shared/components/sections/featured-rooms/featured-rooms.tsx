import { Box } from "../../../../../styled-system/jsx";
import { FeaturedRoomsHeading } from "./heading-featured-rooms";
import { RoomCards } from "./rooms-cards";

export function FeaturedRooms() {
    return (
        <Box>
            <FeaturedRoomsHeading />

            <RoomCards />
        </Box>
    );
}

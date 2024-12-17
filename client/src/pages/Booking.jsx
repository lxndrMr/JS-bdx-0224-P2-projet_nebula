import { useState } from "react";
import JourneyDetails from "../components/JourneyDetails";
import ReservationModule from "../components/ReservationModule";
import VehiculeSelect from "../components/VehiculeSelect";

export default function Booking() {
  // eslint-disable-next-line no-unused-vars
  const [selectedShip, setSelectedShip] = useState(null);
  return (
    <main>
      <ReservationModule />
      <VehiculeSelect setSelectedShip={setSelectedShip} />
      <JourneyDetails />
    </main>
  );
}

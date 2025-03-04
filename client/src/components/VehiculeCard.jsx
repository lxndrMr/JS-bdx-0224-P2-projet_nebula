import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { ReservationContext } from "../Contexts/ReservationContext";

export default function VehiculeCard({
  ship,
  index,
  selected,
  handleSelectShip,
}) {
  const { reservationFormData, updateReservationFormData } =
    useContext(ReservationContext);

  const [travelTime] = useState(
    reservationFormData.selectedShipsData[index]?.travelTime ||
      Math.floor(Math.random() * 41 + 10)
  );
  const [price] = useState(
    reservationFormData.selectedShipsData[index]?.price ||
      Math.floor(Math.random() * 10000)
  );

  const handleSelect = () => {
    updateReservationFormData({
      ...reservationFormData,
      selectedShipIndex: index,
      selectedShipsData: {
        ...reservationFormData.selectedShipsData,
        [index]: {
          travelTime,
          price,
        },
      },
    });

    handleSelectShip(index);
  };

  return (
    <article className={selected ? "selected" : "none"}>
      <h3>{ship.name}</h3>
      <p>Travel time : {travelTime} days</p>
      <p>Price : {price} credits</p>
      <button type="button" onClick={handleSelect}>
        Choose this ship
      </button>
    </article>
  );
}

VehiculeCard.propTypes = {
  ship: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  selected: PropTypes.bool.isRequired,
  handleSelectShip: PropTypes.func.isRequired,
};

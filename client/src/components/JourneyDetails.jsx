import { useContext, useState } from "react";
import {
  Button,
  Dialog,
  DialogTrigger,
  Modal,
  ModalOverlay,
} from "react-aria-components";
import { Link } from "react-router-dom";
import { ButtonContext } from "../Contexts/ButtonContext";
import { ReservationContext } from "../Contexts/ReservationContext";
import { ShipContext } from "../Contexts/ShipContext";
import "../styles/JourneyDetails.scss";

export default function JourneyDetails() {
  const { reservationFormData } = useContext(ReservationContext);
  const { isButtonVisible, setIsButtonVisible } = useContext(ButtonContext);
  const { ships } = useContext(ShipContext);
  const { selectedShipIndex, selectedShipsData } = reservationFormData;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    setIsButtonVisible(true);
    setIsModalOpen(true);
  };

  const handleModifyClick = () => {
    setIsButtonVisible(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const { selectedTripType, selectedReturnDate } = reservationFormData;

  const selectedShip =
    selectedShipIndex !== null ? ships[selectedShipIndex] : null;
  const selectedShipData =
    selectedShipIndex !== null
      ? selectedShipsData[selectedShipIndex] || {}
      : {};

  return (
    <section className="JourneyDetails" inert={isModalOpen ? "" : undefined}>
      <h2>Summary</h2>
      <article>
        <h3>Details :</h3>
        {!isButtonVisible && (
          <Button href="#" onClick={handleModifyClick}>
            Modify
            <img
              src="src/assets/images/ModifyIcon.svg"
              alt="modify your informations"
            />
          </Button>
        )}
        <ul>
          <li>Departure : {reservationFormData.selectedDeparture}</li>
          <li>Destination : {reservationFormData.selectedArrival}</li>
          <li>Departure Date : {reservationFormData.selectedDate}</li>
          <li>
            Number of passengers : {reservationFormData.selectedTravelers}
          </li>
          <li>Fare : {reservationFormData.selectedTripType}</li>
          {selectedTripType === "roundTrip" && (
            <li>Return Date: {selectedReturnDate}</li>
          )}
        </ul>
      </article>
      <article>
        <h3>Ship :</h3>
        {selectedShip ? (
          <ul>
            <li>{selectedShip.name}</li>
            <li>
              Travel time : {selectedShipData.travelTime || "Not available"}{" "}
              days
            </li>
            <li>Price : {selectedShipData.price || "Not available"} credits</li>
          </ul>
        ) : (
          <p>No ship selected</p>
        )}
      </article>
      <DialogTrigger>
        {!isButtonVisible && (
          <Button type="button" onPress={handleClick}>
            Confirm & Pay
          </Button>
        )}
        {isModalOpen && (
          <ModalOverlay className="modal-overlay" onClose={handleModalClose}>
            <Modal className="modal">
              <Dialog>
                <>
                  <p>Travel price : {selectedShipData.price} credits.</p>
                  <p className="scan">Retinal scan in progress...</p>
                  <img
                    src="https://cdnl.iconscout.com/lottie/premium/thumb/eye-scanner-5456745-4561468.gif"
                    width={300}
                    alt="Retinal scan"
                  />
                  <Link className="ticketLink" to="/yourTrip">
                    Your trip
                  </Link>
                </>
              </Dialog>
            </Modal>
          </ModalOverlay>
        )}
      </DialogTrigger>
    </section>
  );
}

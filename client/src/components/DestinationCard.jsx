import { PropTypes } from "prop-types";
import {
  Button,
  Dialog,
  DialogTrigger,
  Modal,
  ModalOverlay,
} from "react-aria-components";

import("../styles/DestinationCard.scss");

function DestinationCard({ title, thumbnail, translation }) {
  return (
    <section className="card">
      <img src={thumbnail} alt={title} className="cardImg" />
      <h2 className="destinationTitle">{title}</h2>
      <p className="truncate">{translation}</p>

      <DialogTrigger>
        <Button className="aboutButton" type="button" aria-label="About">
          About
        </Button>
        <ModalOverlay className="modal-overlay">
          <Modal className="modal" />
          <Dialog>
            {({ close }) => (
              <>
                <img src={thumbnail} alt={title} className="cardImg" />
                <h2 className="destinationTitle">{title}</h2>
                <p className="truncate">{translation}</p>
                <Button
                  className="closeButton"
                  onPress={close}
                  aria-label="close"
                >
                  Close
                </Button>
              </>
            )}
          </Dialog>
          <Modal />
        </ModalOverlay>
      </DialogTrigger>
    </section>
  );
}

DestinationCard.propTypes = {
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.string,
  translation: PropTypes.string.isRequired,
};

DestinationCard.defaultProps = {
  thumbnail: "../assets/images/twisc020524.jpg",
};

export default DestinationCard;

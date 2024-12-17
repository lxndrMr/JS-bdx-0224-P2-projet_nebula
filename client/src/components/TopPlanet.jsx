import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import "../styles/Header.scss";
import Links from "./Links";
import Slogan from "./Slogan";

const path = import.meta.env.VITE_STARCITIZEN_API_URL;

function TopPlanet({ introPlanet }) {
  const [titleUrl, setTitleUrl] = useState(" ");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${path}Rvl7EggdAr`);
        const { data } = await response.json();
        setTitleUrl(data.title);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <section id="header" className="titleSlider">
      <Slogan />
      <h2>{introPlanet}</h2>
      <h2>{titleUrl}</h2>
      <Links
        labelName="link to the planet description"
        routeLink="/ourDestinations"
        linkName="Discover"
      />
    </section>
  );
}

export default TopPlanet;

TopPlanet.propTypes = {
  introPlanet: PropTypes.string.isRequired,
};

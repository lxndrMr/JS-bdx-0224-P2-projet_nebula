import Spline from "@splinetool/react-spline";
import { useEffect, useState } from "react";
import { useIntro } from "../Contexts/IntroContext";
import HomeCards from "../components/HomeCards";
import ReservationModule from "../components/ReservationModule";
import TopPlanet from "../components/TopPlanet";
import "../styles/app.scss";

const path = import.meta.env.VITE_STARCITIZEN_API_URL;

function Home() {
  const [thumbnails, setThumbnails] = useState(
    Array(6).fill({ url: "", titre: "" })
  );

  useEffect(() => {
    const ids = [
      "0Qlx4dQnxL",
      "RegWGPlxqy",
      "RX3rnQ3XqM",
      "VarAoYEQYd",
      "RkGGjdOwQz",
      "0qaPo2JOj1",
    ];

    const fetchThumbnails = async () => {
      try {
        const responses = await Promise.all(
          ids.map((id) => fetch(`${path}${id}`).then((res) => res.json()))
        );

        const newThumbnails = responses.map(({ data }) => ({
          url: data.thumbnail,
          titre: data.title,
        }));

        setThumbnails(newThumbnails);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchThumbnails();
  }, []);
  const { isVisible, changeState } = useIntro();

  return (
    <>
      <section className={isVisible}>
        <h2 className="titleAnim">Discover</h2>
        <Spline
          className="spline"
          scene="https://prod.spline.design/cgzwYfDzL193Eq0L/scene.splinecode"
        />
        <a className="startLink" href="#header" onClick={changeState}>
          Start
        </a>
      </section>
      <header>
        <TopPlanet introPlanet="Take off for" />
      </header>
      <ReservationModule />
      <HomeCards
        sectionTitle="Popular"
        planetTitleLeft={thumbnails[0]?.titre}
        planetTitleMid={thumbnails[1]?.titre}
        planetTitleRight={thumbnails[2]?.titre}
        imageLeft={thumbnails[0]?.url}
        imageMid={thumbnails[1]?.url}
        imageRight={thumbnails[2]?.url}
        descriptionCards="Discover the 3 Humans' Favorite Planets"
      />
      <HomeCards
        sectionTitle="Close to you"
        planetTitleLeft={thumbnails[3]?.titre}
        planetTitleMid={thumbnails[4]?.titre}
        planetTitleRight={thumbnails[5]?.titre}
        imageLeft={thumbnails[3]?.url}
        imageMid={thumbnails[4]?.url}
        imageRight={thumbnails[5]?.url}
        descriptionCards="Discover the 3 planets closest to you"
      />
    </>
  );
}

export default Home;

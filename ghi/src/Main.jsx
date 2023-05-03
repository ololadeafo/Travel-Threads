import React from "react";
import { Link } from "react-router-dom";
import { useGetAccountQuery } from "./services/Travelthreads";

const Main = () => {
  const { data } = useGetAccountQuery();
  const isLoggedIn = !!data;


  const actionButton = {
    fontFamily: "Helvetica",
    width: "30vw",
    marginLeft: "35vw",
    marginRight: "35vw",
    fontSize: "2vw",
    backgroundImage: "linear-gradient(to left, #5E6472, #AED9E0, #FFA69E, #5E6472)",
    color: "white",
    borderStyle: "none",
    borderRadius: "1vw",
    boxShadow: "rgba(0, 0, 0, 0.25) 0px 10px 50px 10px",
    textShadow: "0px 0px 20px rgba(0, 0, 0, 1), 0px 0px 20px rgba(0, 0, 0, 1)"
  };

  const welcome = {
    fontFamily: "Arial Black",
    fontSize: "7vw",
    fontWeight: "bold",
    marginTop: ".3em",
    marginBottom: "-.3em"
  }

  const heading = {
    fontFamily: "Arial Black",
    fontSize: "4vw",
    fontWeight: "bold",
    color: "black",
    marginBottom: "-20px",
  };

  const missionParagraph = {
    fontFamily: "Arial",
    fontSize: "1.3vw",
    marginTop: "2em"
  }

  const headingDiv = {
    width: "55%",
    padding: "1.75em",
    margin: "1em",
  }

  const buttonDiv = {
  }

  const container = {
    position: "relative",
    width: "100%",
    height: "100vh",
    overflow: "hidden",
  }

  const bottomLeft = {
  position: "absolute",
  top: "auto",
  right: "auto",
  bottom: 0,
  left: "0",
  width: "100%",
  height: "100%",
  backgroundImage: "linear-gradient(to bottom right, #AED9E0, #FFA69E)"
};

const topRight = {
  position: "absolute",
  top: "0",
  right: "0",
  bottom: "auto",
  left: "auto",
  width: "100%",
  minHeight: "100%",
  backgroundImage:
    "url(https://www.allianz-partners.com/en_global/products/travel/_jcr_content/root/parsys/stage_copy/stageimage.img.82.3360.jpeg/1656941434448/adobestock-274341667.jpeg)",
  backgroundSize: "cover",
  clipPath: "polygon(30% 0, 100% 0, 100% 100%)",
};

  return (
    <div style={container}>

      <div style={bottomLeft}>
        <div style={headingDiv}>
          <p style={welcome}>
            Welcome
          </p>
          <p style={heading}>
            to Travel Threads!
          </p>
          <p style={missionParagraph}>
            Travel Threads is your ultimate travel companion, helping you pack smartly and stay organized for your next adventure. With our easy-to-use app, you can create customized pack lists tailored to your trip's length, destination, and weather. Plan your days and see the weather forecast, so you're always prepared for the unexpected. Say goodbye to the stress of packing and hello to hassle-free travel with Travel Threads!
          </p>
        </div>
        <div className="d-flex justify-content-center align-items-center">
        </div>
        <div style={buttonDiv}>
          <Link to={isLoggedIn ? "/packinglists" : "/login"}>
            <button
              type="button"
              className=""
              style={actionButton}
            >
              Get Packin'
            </button>
          </Link>
        </div>
      </div>
      <div style={topRight}></div>
    </div>
  );
};

export default Main;

import React, { useEffect, useState, useContext } from "react";
import Iframe from "react-iframe";
import { UserContext } from "../users/UserProvider";
import { PlayerContext } from "../players/PlayerProvider";
import { Modal, Button } from "react-bootstrap";

export default (props) => {
  const { getPlayerData, trashtalkPlayer, stanPlayer } = useContext(
    PlayerContext
  );

  const [playerNameForSearch, setPlayerNameForSearch] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // YouTube Stuff

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  const playerName =
    props.location === "player"
      ? props.playerName
      : props.location === "header"
      ? playerNameForSearch
      : playerNameForSearch;

  useEffect(() => {
    fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&type=video&q=${playerName}&key=AIzaSyBIG5bGgV23VizsRmzOGUuXi9DJwR6SIZc`
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result.items);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, [playerNameForSearch]);

  useEffect(() => {
    getPlayerData().then(() => {
      setPlayerNameForSearch("Charles Barkley");
    });
  }, []);

  useEffect(() => {
    setPlayerNameForSearch(stanPlayer);
  }, [stanPlayer]);

  useEffect(() => {
    setPlayerNameForSearch(trashtalkPlayer);
  }, [trashtalkPlayer]);

  if (props.location === "header") {
    return (
      <>
        {items ? (
          <ul>
            {items.map((i) => {
              const videoId = i.id.videoId;
              return (
                <article>
                  <li key={i.etag}> {i.snippet.description}</li>
                  <Iframe
                    url={`http://www.youtube.com/embed/${videoId}`}
                    width="450px"
                    height="450px"
                    id="myId"
                    className="myClassname"
                    display="initial"
                    position="relative"
                  />
                </article>
              );
            })}
          </ul>
        ) : (
          <div></div>
        )}
      </>
    );
  }

  if (props.location === "player") {
    return (
      <>
        <Button onClick={handleShow}>Hi-lites</Button>

        <Modal show={show} onHide={handleClose}>
          {items ? (
            <ul>
              {items.map((i) => {
                const videoId = i.id.videoId;
                return (
                  <article>
                    <li key={i.etag}> {i.snippet.description}</li>
                    <Iframe
                      url={`http://www.youtube.com/embed/${videoId}`}
                      width="450px"
                      height="450px"
                      id="myId"
                      className="myClassname"
                      display="initial"
                      position="relative"
                    />
                  </article>
                );
              })}
            </ul>
          ) : (
            <div></div>
          )}
        </Modal>
      </>
    );
  }
};

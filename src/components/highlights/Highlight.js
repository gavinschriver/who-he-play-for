import React, { useEffect, useState, useContext } from "react";
import Iframe from "react-iframe";
import { UserContext } from "../users/UserProvider";
import { PlayerContext } from "../players/PlayerProvider";

export default () => {
  const { getUserById, currentUserId } = useContext(UserContext);
  const {
    playerObjArray,
    getPlayerData,
    trashtalkPlayer,
    stanPlayer,
  } = useContext(PlayerContext);

  const [currentUser, setCurrentUser] = useState({
    usersPlayers: [],
    messages: [],
  });
  const [currentUsersPlayers, setCurrentUsersPlayers] = useState([]);
  const [playerNameForSearch, setPlayerNameForSearch] = useState("");

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  const jimmytest = "Jimmy Butler";

  useEffect(() => {
    fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${playerNameForSearch}&key=AIzaSyCuU9zDbWsawNYk2lPU6HeWM6haW1cWScw`
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
    getUserById(currentUserId).then(setCurrentUser).then(getPlayerData);
  }, []);

  useEffect(() => {
    const matchingPlayers =
      currentUser.usersPlayers.map((up) => {
        return playerObjArray.find((p) => {
          return p.player.id === up.playerId;
        });
      }) || {};
    setCurrentUsersPlayers(matchingPlayers);
  }, [playerObjArray]);

  useEffect(() => {
    setPlayerNameForSearch(stanPlayer);
  }, [stanPlayer]);

  useEffect(() => {
    console.log(stanPlayer);
  }, [stanPlayer]);

  return (
    <article>
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
    </article>
  );
};

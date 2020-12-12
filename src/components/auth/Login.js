import React, { useRef } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

export const Login = (props) => {
  const email = useRef();
  const password = useRef();
  const existDialog = useRef();
  const passwordDialog = useRef();

  const existingUserCheck = () => {
    return fetch(
      `https://whpf-database.herokuapp.com/users?email=${email.current.value}`
    )
      .then((_) => _.json())
      .then((user) => (user.length ? user[0] : false));
  };

  const handleLogin = (e) => {
    e.preventDefault();

    existingUserCheck().then((exists) => {
      if (exists && exists.password === password.current.value) {
        localStorage.setItem("whpf_user", exists.id);
        props.history.push("/");
      } else if (exists && exists.password !== password.current.value) {
        passwordDialog.current.showModal();
      } else if (!exists) {
        existDialog.current.showModal();
      }
    });
  };

  return (
    <main className="container--login">
      <dialog className="dialog dialog--auth" ref={existDialog}>
        <div>User does not exist</div>
        <button
          className="button--close"
          onClick={(e) => existDialog.current.close()}
        >
          Close
        </button>
      </dialog>
      <dialog className="dialog dialog--password" ref={passwordDialog}>
        <div>Password does not match</div>
        <button
          className="button--close"
          onClick={(e) => passwordDialog.current.close()}
        >
          Close
        </button>
      </dialog>
      <section>
        <form className="form--login" onSubmit={handleLogin}>
          <h1>WHO HE PLAY FOR??</h1>
          <h2>Please sign in</h2>
          <fieldset>
            <label htmlFor="inputEmail"> Email address </label>
            <input
              ref={email}
              type="email"
              id="email"
              className="form-control"
              placeholder="Email address"
              required
              autoFocus
            />
          </fieldset>
          <fieldset>
            <label htmlFor="inputPassword"> Password </label>
            <input
              ref={password}
              type="password"
              id="password"
              className="form-control"
              placeholder="Password"
              required
            />
          </fieldset>
          <fieldset>
            <button type="submit">Sign in</button>
          </fieldset>
        </form>
      </section>
      <section className="link--register">
        <section className="demoInstructions">
          <h4>DEMO INSTRUCTIONS:</h4>
          <p>
                      1) this app is WICKED insecure so please log in as one of these test
                      users by follwing 'name@name.name' for the email address field and
                      'name' for the password field: jimmy, joel, james, gerald
          </p>
                  <p>
                      2) If you get a white screen of death when you first log in, try a quick refresh. 
                       Workin on it okay jeeze. 
                  </p>
          {/* <Link to="/register">NOT HOOPIN?</Link> */}
        </section>
      </section>
    </main>
  );
};
import { useState } from "react";
import axios from "axios";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    // set configurations
    const configuration = {
      method: "post",
      url: "https://habit-tracker-backend-b3cb5a91b623.herokuapp.com/api/login",
      data: {
        email,
        password,
      },
    };
    // make the API call
    axios(configuration)
      .then((result) => {
        setLogin(true);
      })
      .catch((error) => {
        error = new Error();
      });
  };
  return (
    <>
      <h2>Login</h2>
      <form action="" onSubmit={(e) => handleSubmit(e)}>
        <input
          type="email"
          name="email"
          placeholder="E-mail"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" onClick={(e) => handleSubmit(e)}>
          Login
        </button>
      </form>
      {/* display success message */}
      {login ? (
          <p className="text-success">You Are Logged in Successfully</p>
        ) : (
          <p className="text-danger">You Are Not Logged in</p>
        )}
    </>
  );
};
export default Login;

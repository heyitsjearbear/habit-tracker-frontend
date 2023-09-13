import { useState } from "react";
import axios from "axios";
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    // set configurations
    const configuration = {
      method: "post",
      url: "https://habit-tracker-backend-b3cb5a91b623.herokuapp.com/api/register",
      data: {
        email,
        password,
      },
    };
     // make the API call
    axios(configuration)
    .then((result) => {
      setRegister(true);
    })
    .catch((error) => {
      error = new Error();
    });
  }
  return (
    <>
      <h2>Register</h2>
      <form action="" onSubmit={(e)=>handleSubmit(e)}>
        <input
          type="email"
          name="email"
          value={email}
          placeholder="E-mail"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" onClick={(e)=>handleSubmit(e)}>register</button>
        {/* display success message */}
        {register ? (
          <p className="text-success">You Are Registered Successfully</p>
        ) : (
          <p className="text-danger">You Are Not Registered</p>
        )}
      </form>
    </>
  );
};
export default Register;

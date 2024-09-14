import axios from "axios";
import { useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./login.css";

function Login() {
  const formRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(formRef.current);

    const email = formData.get("email");
    const password = formData.get("password");

    axios
      .post(
        "http://127.0.0.1:8000/api/login",
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        const token = res.data.token;
        const id = res.data.id;
        localStorage.setItem("authToken", token);
        localStorage.setItem("user_id", id);
      })
      .then(() => {
        navigate("/");
      });
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <form ref={formRef} onSubmit={handleSubmit}>
        <input type="email" name="email" required placeholder="Email" />
        <input
          type="password"
          name="password"
          required
          placeholder="Mot de Passe"
        />

        <input type="submit" value="Valider" />
      </form>
      <NavLink to="/register">Vous n'avez pas encore de compte</NavLink>
    </div>
  );
}

export default Login;

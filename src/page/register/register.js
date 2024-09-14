import axios from "axios";
import { useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./register.css";

function Register() {
  const formRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(formRef.current);

    // Récupération des valeurs du formulaire
    const email = formData.get("email");
    const password = formData.get("password");
    const username = formData.get("username");

    axios
      .post(
        "http://127.0.0.1:8000/api/register",
        {
          name: username,
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
        alert("Utilisateur crée");
        navigate("/login");
      });
  };

  return (
    <div className="register">
      <h1>Register</h1>
      <form ref={formRef} onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          required
          placeholder="Nom d'utilisateur"
        />
        <input type="email" name="email" required placeholder="Email" />
        <input
          type="password"
          name="password"
          required
          placeholder="Mot de Passe"
        />

        <input type="submit" value="Valider" />
      </form>
      <NavLink to="/login">Vous avez déjà un compte</NavLink>
    </div>
  );
}

export default Register;

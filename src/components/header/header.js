import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "./header.css";

function Header() {
  const [pathname, setPathname] = useState("");
  const url = useLocation();
  const navigate = useNavigate();
  const [total, setTotal] = useState("");

  useEffect(() => {
    setPathname(url.pathname);
    const token = localStorage.getItem("authToken");
    const user_id = localStorage.getItem("user_id");
    axios
      .get("http://127.0.0.1:8000/api/transaction/total/" + user_id, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setTotal(res.data.total);
      });
  }, [url]);

  const logout = () => {
    const token = localStorage.getItem("authToken");
    axios
      .post(
        "http://127.0.0.1:8000/api/logout",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        localStorage.removeItem("authToken");
        navigate("/login");
      });
  };
  return (
    <div className="header">
      <nav>
        <img src="/img/image crypto.jpg" alt="" height="40px" width="40px" />
        <h1>Gestion de Finance</h1>
        <div className="right">
          {pathname === "/addForm" ? (
            <NavLink to="/">Accueil</NavLink>
          ) : (
            <NavLink to="/addForm">Ajouter des transaction</NavLink>
          )}
          <button onClick={() => logout()}>Déconnexion</button>
        </div>
      </nav>
      <div className="infos-container">
        <div className="infos-user">
          <h2>Johan Pires</h2>
          <span id="price">{total} €</span>
          <span>25/09/2024</span>
        </div>
        <div className="img-right">
          <img src="/img/image crypto.jpg" alt="" height="30px" width="30px" />
          <img src="/img/image crypto.jpg" alt="" height="30px" width="30px" />
        </div>
      </div>
    </div>
  );
}

export default Header;

import axios from "axios";
import { useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./form.css";

function Form() {
  const formRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");

    const formData = new FormData(formRef.current);

    const title = formData.get("title");
    const amount = formData.get("amount");
    const type = formData.get("type");
    const categorie = formData.get("categorie");
    const date = formData.get("date");

    axios
      .post(
        "http://127.0.0.1:8000/api/transaction",
        {
          description: title,
          amount: amount,
          type: type,
          categorie: categorie,
          date: date,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        navigate("/");
      });
  };

  return (
    <div className="form">
      <h1>Form</h1>
      <form ref={formRef} onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          required
          placeholder="Nom de la transaction"
        />
        <input type="number" name="amount" required placeholder="Montant" />
        <select name="type" id="" required>
          <option value="income">Gain</option>
          <option value="expense">Dépense</option>
        </select>
        <select name="categorie" required>
          <option value="alimentation">Alimentation</option>
          <option value="logement">Logement</option>
          <option value="loisirs">Loisirs</option>
          <option value="transport">Transport</option>
          <option value="assurance">Assurance</option>
          <option value="salaire/gain">salaire/gain</option>
        </select>
        <input type="date" name="date" />

        <input type="submit" value="Valider" />
      </form>
    </div>
  );
}

export default Form;

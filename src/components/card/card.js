import { useEffect, useState } from "react";
import "./card.css";
import axios from "axios";

function Card({ transaction }) {
  const [isEditing, setIsEditing] = useState(false); // État pour suivre si l'utilisateur édite la transaction
  const [description, setDescription] = useState(transaction.description);
  const [amount, setAmount] = useState(transaction.amount);
  const [date, setDate] = useState(transaction.date);
  const [formatDate, setFormatDate] = useState("");

  useEffect(() => {
    const [year, month, day] = date.split("-");
    setFormatDate(`${day}/${month}`);
  }, [transaction.date]);

  const deleteTransaction = () => {
    const token = localStorage.getItem("authToken");

    axios
      .delete(`http://127.0.0.1:8000/api/transaction/${transaction.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression de la transaction", error);
      });
  };

  const updateTransaction = () => {
    const token = localStorage.getItem("authToken");
    const user_id = localStorage.getItem("user_id");
    const transactionType = transaction.type;
    const transactionDate = date ? date : transaction.date;

    axios
      .put(
        `http://127.0.0.1:8000/api/transaction/${transaction.id}`,
        {
          description,
          amount,
          date: transactionDate,
          type: transactionType,
          user_id: user_id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setIsEditing(false);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour de la transaction", error);
      });
  };
  return (
    <div
      className="card"
      style={{
        backgroundColor:
          transaction.type === "income" ? "#13c99838" : "#ff63634f",
      }}
    >
      {isEditing ? (
        <div className="left edit">
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <input
            type="date"
            value={formatDate}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
      ) : (
        <div className="left">
          <h5>{transaction.description}</h5>
          <p>
            Date de transaction : <span>{formatDate}</span>
          </p>
        </div>
      )}
      {isEditing ? (
        <div className="right">
          <button id="save" onClick={updateTransaction}>
            Enregistrer
          </button>
          <button
            id={transaction.type === "income" ? "delete-green" : "delete-red"}
            onClick={() => setIsEditing(false)}
          >
            Annuler
          </button>
        </div>
      ) : (
        <div className="right">
          <span>{transaction.amount}€</span>
          <button
            id={transaction.type === "income" ? "delete-green" : "delete-red"}
            onClick={deleteTransaction}
          >
            Supprimer
          </button>
          <button
            id={transaction.type === "income" ? "delete-green" : "delete-red"}
            onClick={() => setIsEditing(true)}
          >
            Modifier
          </button>
        </div>
      )}
    </div>
  );
}

export default Card;

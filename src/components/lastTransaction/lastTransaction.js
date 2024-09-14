import axios from "axios";
import Card from "../card/card";
import { useEffect, useState } from "react";
import "./lastTransaction.css";

function LastTransaction() {
  const [transactions, setTransactions] = useState([]);

  const token = localStorage.getItem("authToken");
  const user_id = localStorage.getItem("user_id");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/transaction/" + user_id, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setTransactions(res.data);
      });
  }, []);

  return (
    <div className="lastTransaction">
      <h2>Dernières Transactions</h2>
      <div className="transactions">
        {transactions.slice(-4).map((transaction) => (
          <Card key={transaction.id} transaction={transaction} />
        ))}
      </div>
    </div>
  );
}

export default LastTransaction;

import axios from "axios";
import Card from "../card/card";
import { useEffect, useState } from "react";
import Categorie from "../categorie/categorie";
import { useSelector } from "react-redux";
import "./categoriesComponents.css";

function CategorieComponents() {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const categorieValue = useSelector((state) => state.categorie.categorieId);

  const token = localStorage.getItem("authToken");
  const user_id = localStorage.getItem("user_id");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/categorie", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCategories(res.data);
      });

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
    <div className="categorieComponents">
      <h2>Catégories de Transactions</h2>
      <div className="categories">
        {categories.map((categorie) => (
          <Categorie key={categorie.id} categorie={categorie} />
        ))}
      </div>
      <div className="transactions">
        {transactions
          .filter((transaction) => transaction.categorie === categorieValue)
          .map((transaction) => (
            <Card key={transaction.id} transaction={transaction} />
          ))}
      </div>
    </div>
  );
}

export default CategorieComponents;

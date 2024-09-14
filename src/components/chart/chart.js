import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import axios from "axios";
import "./chart.css";

ChartJS.register(ArcElement, Tooltip);

const Chart = () => {
  const [data, setData] = useState(null);

  const token = localStorage.getItem("authToken");
  const user_id = localStorage.getItem("user_id");

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/transaction/${user_id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const transactions = res.data;

        let loisirs = 0;
        let alimentation = 0;
        let logement = 0;
        let assurance = 0;
        let transport = 0;
        let salaire = 0;

        transactions.forEach((transaction) => {
          if (transaction.type === "expense") {
            const amount = parseFloat(transaction.amount);
            switch (transaction.categorie) {
              case "loisirs":
                loisirs += amount;
                break;
              case "transport":
                transport += amount;
                break;
              case "assurance":
                assurance += amount;
                break;
              case "logement":
                logement += amount;
                break;
              case "alimentation":
                alimentation += amount;
                break;
              case "salaire/gain":
                salaire += amount;
                break;
              default:
                break;
            }
          }
        });

        setData({
          labels: [
            "Alimentation",
            "Loisirs",
            "Transports",
            "Logement",
            "Assurance",
            "Salaire/gain",
          ],
          datasets: [
            {
              label: "Dépenses",
              data: [
                alimentation,
                loisirs,
                transport,
                logement,
                assurance,
                salaire,
              ],
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(255, 150, 192, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(100, 150, 192, 1)",
              ],
              borderWidth: 1,
            },
          ],
        });
      });
  }, [user_id, token]);
  return (
    <div className="chart">
      <h2>Graphique des dépenses</h2>
      <div className="donut" style={{ width: "30%" }}>
        {data && <Doughnut data={data} />}
      </div>
    </div>
  );
};

export default Chart;

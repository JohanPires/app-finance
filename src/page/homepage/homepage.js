import { useEffect, useState } from "react";
import CategorieComponents from "../../components/categoriesConponents/categoriesComponents";
import Chart from "../../components/chart/chart";
import Header from "../../components/header/header";
import LastTransaction from "../../components/lastTransaction/lastTransaction";
import { useNavigate } from "react-router-dom";

function Homepage() {
  const navigate = useNavigate();
  const [isTokenChecked, setIsTokenChecked] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      navigate("/login");
    } else {
      setIsTokenChecked(true);
    }
  }, [navigate]);
  if (!isTokenChecked) {
    return null;
  }
  return (
    <div className="Homepage">
      <Header />
      <LastTransaction />
      <CategorieComponents />
      <Chart />
    </div>
  );
}

export default Homepage;

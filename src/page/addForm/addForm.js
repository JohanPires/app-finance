import { useNavigate } from "react-router-dom";
import Form from "../../components/Form/form";
import Header from "../../components/header/header";
import { useEffect, useState } from "react";

function AddForm() {
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
    <div className="addForm">
      <Header />
      <Form />
    </div>
  );
}

export default AddForm;

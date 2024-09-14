import { useDispatch, useSelector } from "react-redux";
import { setcategorieId } from "../../slice/categorieSlice";
import "./categorie.css";

function Categorie({ categorie }) {
  const dispatch = useDispatch();
  const categorieValue = useSelector((state) => state.categorie.categorieId);

  const sendCategorie = (value) => {
    dispatch(setcategorieId(value));
  };
  return (
    <div
      className="categorie"
      id={categorie.name}
      onClick={(e) => sendCategorie(e.currentTarget.id)}
      style={{
        backgroundColor:
          categorieValue === categorie.name ? "#456efe" : "rgb(197, 197, 197)",
      }}
    >
      <i>icon</i>
      <h4>{categorie.name}</h4>
    </div>
  );
}

export default Categorie;

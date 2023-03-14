import React, { useState } from "react";
//import useInput from "../hooks/useInput";
//import Input from "../commons/Input";
import ProductData from "../commons/ProductData.jsx";
import { FaPlus } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";

const EditCategories = () => {
  //const newCategories = useInput();
  const categories = [
    {
      name: "Sandbox Real time strategy (RTS)",
    },
    {
      name: "Shooters (FPS and TPS)",
    },
    {
      name: "Multiplayer online battle arena (MOBA)",
    },
    {
      name: "Role-playing (RPG, ARPG, and More)",
    },
    {
      name: "Simulation and sports",
    },
    {
      name: "Puzzlers and party games",
    },
    {
      name: "Platformer",
    },
  ];
  const [formValues, setFormValues] = useState([{ categorie1: "" }]);

  const onSubmitHandler = (e) => {
    console.log(e);
  };

  const addFormFieldsHandler = () => {
    setFormValues([...formValues, { name: "", email: "" }]);
  };

  const inputChangeHandler = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  };

  const removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };

  return (
    <div className="editProductsWrapper">
      <div className="dataSheetWrapper">
        <p style={{ color: "white", fontSize: "3rem" }}>Current categories</p>
        <div className="editDataSheet">
          {categories.map((categorie, i) => (
            <ProductData info={categorie.name} />
          ))}
        </div>
      </div>

      <div className="editConteiner">
        <form
          className="editCategoriesForm"
          id="editCategoriesForm"
          onSubmit={onSubmitHandler}
        >
          <h3 className="registerTitle">Edit categories</h3>
          {formValues.map((element, index) => (
            <div className="formInline" key={index}>
              <input
                className="editCategoriesInput"
                name="name"
                type="text"
                placeholder="New categorie"
                value={element.name || ""}
                onChange={(e) => inputChangeHandler(index, e)}
              />

              <button
                type="button"
                className="deleteCategorieButton"
                onClick={() => removeFormFields(index)}
              >
                <FaTrash />
              </button>
            </div>
          ))}
          <button
            className="registerButton"
            type="button"
            onClick={() => addFormFieldsHandler()}
          >
            <FaPlus />
          </button>
          <button className="registerButton" type="submit">
            Change
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCategories;

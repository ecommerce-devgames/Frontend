import React, { useState } from "react";
import useInput from "../hooks/useInput";
import ProductData from "../commons/ProductData.jsx";
import { FaPlus } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";

const EditCategories = () => {
  const newCategorie = useInput();
  const oldCategorie = useInput();
  //States
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


  //Handlers and functions
  const onSubmitHandler = (e) => {
    console.log(e);
  };

  const addFormFieldsHandler = () => {
    setFormValues([...formValues, { categorie: " "}]);
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
        <p className="editProductTitle">Current categories</p>
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
          <h3 className="registerTitle">Create categories</h3>
          {formValues.map((element, index) => (
            <div className="formInline" key={index}>
              <input
                className="createCategoriesInput"
                name="name"
                type="text"
                placeholder="New categorie"
                value={element.name || ""}
                onChange={(e) => inputChangeHandler(index, e)}
              />

              <button
                type="button"
                className="deleteCategoriesButton"
                onClick={() => removeFormFields(index)}
              >
                <FaTrash />
              </button>
            </div>
          ))}
          <button
            className="editCategoriesButton"
            type="button"
            onClick={() => addFormFieldsHandler()}
          >
            <FaPlus />
          </button>
          <button className="editCategoriesButton" type="submit">
            Create
          </button>
        </form>
        <form
          className="editCategoriesForm"
          id="editCategoriesForm"
          onSubmit={onSubmitHandler}
        >
          <h3 className="registerTitle">Edit categories</h3>          
            <div className="formColumn">
              <input
                className="editCategoriesInput"
                name="name"
                type="text"
                placeholder="Categorie to update"
                {...oldCategorie}
              />
                <input
                className="editCategoriesInput"
                name="name"
                type="text"
                placeholder="Categorie updated"
                {...newCategorie}
              />            
            </div>
          <button className="editCategoriesButton" type="submit">
            Edit
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCategories;

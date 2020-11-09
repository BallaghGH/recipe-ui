import React, { useState, useEffect } from 'react';
import '../App.scss';
import makeRequest from '../services/api';
import StringifyAllergens from '../Utils/DataMappers'


const IngredientTable = () => {

  const [ingredients, setIngredients] = useState([]);

  const getData = async () => {
    makeRequest('GET', "", {}, "ingredient")
      .then((response) => {
        console.log(response);
        setIngredients(response.data);
      })
      .catch((err) => {
        console.log(err)
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const renderHeaderData = () => {
    return (
      <>
        <th>Ingredient</th>
        <th>Price</th>
        <th>Units</th>
        <th>Conversion Factor</th>
        <th>Tesco Product</th>
        <th>Allergens</th>
      </>
    );
  };
/*
  const renderAllergens = () => {
    return ingredients.allergens && ingredients.allergens.map((al) => {
      const { allergenID, allergenName, description } = al;
      return (
        <> { allergenName } </>
      )
    }
  };
*/
  const renderTableData = () => {
    return ingredients && ingredients.map((data) => {
      const { ingredientId, description, pricePerUnit,
        tescoSearchTerm, tescoConversionFactor, tescoProductId, unit, allergens } = data;
      return (
        <tr key={ingredientId}>
          <td>{description}</td>
          <td>{pricePerUnit}</td>
          <td>{unit.name}</td>
          <td>{tescoConversionFactor}</td>
          <td>{tescoSearchTerm}</td>
          <td>{StringifyAllergens(allergens)}</td>
        </tr>
      );
    })
  };


  return (
    <div>
      <table cellSpacing="0" className="unit-table">
        <thead>
          <tr>{renderHeaderData()}</tr>
        </thead>
        <tbody>
          {renderTableData()}
        </tbody>
      </table>
    </div>
  )


}
export default IngredientTable



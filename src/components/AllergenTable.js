import React, { useState, useEffect } from 'react';
import '../App.scss';
import makeRequest from '../services/api';

const AllergenTable =() =>{

  const [allergens, setAllergens] = useState([]);

  const getData = async () => {
    makeRequest('GET', "", {}, "allergen")
      .then((response) => {
        console.log(response);
        setAllergens(response.data);
      })
      .catch((err) => {
        console.log(err)
      });
  }

  useEffect(() => {
    getData();
  },[]);


  const renderHeaderData = () => {
    return (
      <>
        <th>Name</th>
        <th>Description</th>
      </>
    );
  }

  const renderTableData = () => {
    return allergens && allergens.map((data) => {
      const { allergenId, allergenName, description } = data;
      return (
        <tr key={allergenId}>
          <td>{allergenName}</td>
          <td>{description}</td>
        </tr>
      );
    })
  }


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
export default AllergenTable



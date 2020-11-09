/*
Take an array of allergens in the form:
"allergens": [
            {
                "allergenId": 7,
                "allergenName": "Milk",
                "description": "Milk is a common ingredient in butter, cheese"
            }
        ]
  and return the allergenName field as as CSV string. If allergens is
  null, an empty string is returned
*/
export default function StringifyAllergens(allergens){
  let allergensAsString = "";
  allergens && allergens.forEach(element => {
     allergensAsString = allergensAsString + element.allergenName + ",";
   });
   //remove the trailing comma
   return allergensAsString.substring(0,allergensAsString.length-1);
}
import React from 'react';
import '../App.scss';
import UnitTable from './UnitTable'
import AllergenTable from './AllergenTable'
import IngredientTable from './IngredientTable'
import Header from './Header';
import Footer from './Footer'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from "@material-ui/core/Box";

//class App extends React.Component {

  function TabPanel(props){
    const {children,value,index}=props;
    return(
      <div>
        {value===index && <Box p={3}>{children}</Box>}
      </div>
    );
  }

export default function App(){
//  render() {
    const [value,SetValue] = React.useState(0);
    const handleChange = (event, newValue) => {SetValue(newValue);};
    return (
      <>
        <div className="app--container">
          <Header />

          <Tabs value={value}
          onChange={handleChange} 
          //orientation="vertical"
          aria-label="simple tabs example">
            <Tab label="Campaigns" />
            <Tab label="Recipes" />
            <Tab label="Ingredients" />
            <Tab label="Units"/>
            <Tab label="Allergens" />
          </Tabs>
          <TabPanel value={value} index={0}>
             Campaigns
             </TabPanel>
          <TabPanel value={value} index={1}>
            Recipes
          </TabPanel>
          <TabPanel value={value} index={2}>
             <IngredientTable/>
          </TabPanel>
          <TabPanel value={value} index={3}>
            <UnitTable/>

          </TabPanel>
          <TabPanel value={value} index={4}>
             <AllergenTable/>
          </TabPanel>

          <Footer />
        </div>
      </>
    );
  //}
}
/*        <div className="app--container">
          <UnitTable/>
        </div>*/

//export default App;

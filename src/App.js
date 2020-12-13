import React from 'react';
import './App.css';
import Customerlist from './components/Customerlist';
import Traininglist from './components/Traininglist'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

function App() {
const[value, setValue] = React.useState('Trainings');
const handleChange= (event, value) => {setValue(value);};
return (
  <div className ="App">
   <AppBar position="static">
     <Tabs value={value} onChange={handleChange}>
       <Tab value="Trainings" label="Trainings"/>
       <Tab value="Customers" label="Customers"/>
     </Tabs>
  </AppBar>
  {value == 'Trainings' && <Traininglist/>}
  {value == 'Customers' && <Customerlist/>} 
</div>

  );
}

export default App;

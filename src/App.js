import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AddUser from './components/AddUser';
import Login from './components/Pages/Login/Login'
import Userdata from './components/Pages/UserData/Userdata';
function App() {
  return (
    <div className="App">
    
     <BrowserRouter>
    
              <Routes>
                <Route  path='/AddUser' element={<AddUser/>}/>
                <Route  index element={ <Login/>}/> 
                <Route  path='/Userdata' element={<Userdata/>}/>
              </Routes>
     </BrowserRouter>
     
    </div>
  );
}

export default App;

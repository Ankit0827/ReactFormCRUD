import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AddUser from './components/AddUser';
import Userdata from './components/Pages/UserData/Userdata';
import 'react-toastify/dist/ReactToastify.css'; 
function App() {
  return (
    <div className="App">
     <BrowserRouter>
              <Routes>
                <Route  path='/' element={<AddUser/>}/>
                <Route  path='/Userdata' element={<Userdata/>}/>
              </Routes>
     </BrowserRouter>
     
    </div>
  );
}

export default App;

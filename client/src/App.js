import {BrowserRouter, Navigate, Route,Routes} from 'react-router-dom';
import Home from './pages/home';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import LoginSchool from './pages/loginSchool';
import AdminPage from './pages/adminPage';
import Header from './components/header';
import SchoolPage from './pages/admin/schoolPage';

function App() {
  return (
    <BrowserRouter>
      <Header />
        <Routes>
            <Route exact path='/login' element={<LoginSchool />} />  
            <Route path='/' element={<Home />} />
            <Route path='/adminpage' element={<AdminPage />} />
            <Route path='/school/:id/:gen' element={<SchoolPage />} />
            <Route path='*' element={<Navigate to='/' replace />} />    
        </Routes>
    </BrowserRouter>
  );
}

export default App;

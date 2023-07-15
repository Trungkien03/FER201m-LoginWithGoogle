import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import  Navigation from './components/Navigation';
import {Home} from "./pages/Home";
import {Contact} from "./pages/Contact";
import {Dashboard} from "./pages/Dashboard";
import {Detail} from "./pages/Detail";
import { Footer } from './components/Footer';
import { FormAdd } from './components/FormAdd';
import FormSignIn from './components/FormSignIn';
import { TopNews } from './pages/TopNews';
import Protected from './components/Protected';
function App() {
  return (
    <div className="App">
      <Router>
        <Navigation/>
        <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/signin' element={<FormSignIn/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/dashboard' element={<Protected><Dashboard/></Protected>}/>
        <Route path='/detail/:id' element={<Detail/>}/>
        <Route path='/add' element={<Protected><FormAdd/></Protected>}/>
        <Route path='/topnews' element={<TopNews/>}/>
        </Routes>
      </Router>
      <Footer/>
    </div>
  );
}

export default App;

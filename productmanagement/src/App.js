import logo from './logo.svg';
//import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import myRouter from './components/layout';
import myRouter2 from './components/layout2';
import { RouterProvider } from 'react-router-dom';
import context from './services/context';
import Login from './components/login';
import Robot from './components/Robot';
import '../src/css/App.css';
import Signup from './components/Signup';


function App() {
  const [state, setState] = useState({ products: [], user: null });

  useEffect(() => {
    const tokendata = JSON.parse(localStorage.getItem("user"));
    if (tokendata) {
      setState({ ...state, user: tokendata })
    }
  }, [])
  return (
    <div className="container">
      <context.Provider value={{ state, setState }} >
        <div>
          {state.user ? <RouterProvider router={myRouter} /> : <RouterProvider router={myRouter2} />}
        </div>
        <Robot></Robot>
      </context.Provider>
    </div>

  );
}
export default App;

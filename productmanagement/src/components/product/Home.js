import { useOutlet } from "react-router";
import { useNavigate } from 'react-router-dom';
import ProductList from '../product/ProductList';
import context from "../../services/context";
import { useContext,useEffect} from 'react';
import '../../css/home.css'

function Home() {
    const navigate = useNavigate();
    const { state, setState } = useContext(context)

    const navigateToTaskAdd = () => {
        navigate('/addProduct');
    }

    const SignOut = () => {
        setState({...state, user: null }) 
        localStorage.removeItem("user");
        navigate('/')
    }

    const outlet = useOutlet();
    
    return (
        <div className="home-container" >
            <h1 className="login-heading-with-image">
                
        <img src="../images/logo.png" alt="Image Description" class="image rotate-image" />
       Product Management System
    </h1>
    <h4 className="home-h4">version 1.0</h4>
           <div>
                {outlet}
            </div>
                      <div className="btn-container-head">
                <div>
                <button onClick={() => navigateToTaskAdd()} className="mybtn">&#10010; New</button>
                               </div>
                <div>
                <button onClick={() => SignOut()} className="mybtn">&#8599; SignOut</button>

                </div>
               
            </div>
            <ProductList ></ProductList>
        </div>
    )
}
export default Home;
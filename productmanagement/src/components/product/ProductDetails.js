
import { useLocation, useNavigate } from 'react-router-dom';
import { deleteProduct } from '../../productNetwork';
import { useState, useContext, useEffect } from 'react';
import context from '../../services/context';
import { getProducts } from '../../productNetwork';
import '../../css/productdetail.css';
function ProductDetails(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const productDetail = props.prod;
    const navigateToProductEdit = (td) => {
        navigate('/editProduct', { state: { td } })
    }
    const navigateBack = () => {
        navigate('/tasklist')
    }

    const { state, setState } = useContext(context)
    const [refreshComponent, setRefreshComponent] = useState(false);

    async function getData() {
        if (state.user) {
            const res = await getProducts(state.user);
            if (res && res.success) {
                setState({ ...state, products: res.data })
            } else {
                setState({ ...state, tasks: [] })
            }
        }
    }
    // useEffect(() => {
    //     getData();
    // }, [refreshComponent])

    const DeleteProduct = async (x) => {
        const result = window.confirm('Are you sure you want to proceed?');
        if (result) {
            const res = await deleteProduct(state, x)
            //setRefreshComponent(!refreshComponent)
            getData();
        }
    };
    return (
       
        
            <div className='product'>
                  <h5 className="product-title">{productDetail.name}</h5>              
                   <p> <b>Price</b>:  {productDetail.price}</p>
                   <p><b>Origin</b>:  {productDetail.origin}</p>
           
            <div className="btn-container">
                <div>
                    <button onClick={() => navigateToProductEdit(productDetail)} className='mybtn'>&#10000; Edit </button>
                </div>
                <div>
                    <button onClick={() => DeleteProduct(productDetail.id)} className='mybtn'>&#10005; Delete</button>
                </div>
            </div>
            </div>
      
    
    )
}
export default ProductDetails; 
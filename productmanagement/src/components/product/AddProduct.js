import { useContext, useEffect, useRef, useState } from 'react';
import Product from '../../models/Product';
import { useNavigate } from 'react-router-dom';
import { addProduct } from '../../productNetwork';
import context from '../../services/context';
import '../../css/addproduct.css';
function AddProduct() {

    const navigate = useNavigate();
    const { state, setState } = useContext(context)
    const [formData, setFormData] = useState({ inStock: 'true' });
const name=useRef();
    // Event handler to update form data when input fields change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }
    useEffect(() => {
        // Use the ref to focus the input when the component mounts
        name.current.focus();
      }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const addData = new Product('', formData.name, formData.price, formData.origin, formData.inStock)
        const res = await addProduct(state, addData)
        if (res.success) {
            navigate('/');
        }
    }
    const handleBack=()=>{
        navigate('/');
    };
    return (
        <div className='addprodcut-container'>
            <h1 class="login-heading-with-image">
                
                <img src="../images/logo.png" alt="Image Description" class="image rotate-image" />
               Product Management System
            </h1>
            <h4 className="home-h4">New Product</h4>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name"> Product Name</label>
                    <input
                        type="text"
                        className="form-control input-text"
                        ref={name}
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price $</label>
                    <input
                        type="number"
                        className="form-control input-text"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="origin">Origin</label>
                    <input
                        type="text"
                        className="form-control input-text"
                        id="origin"
                        name="origin"
                        value={formData.origin}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group ">
                    <label htmlFor="inStock">In stock</label>
                    <select id="inStock" className="form-control input-text" name="inStock" value={formData.inStock} onChange={handleInputChange}>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </div>
<div className='btn-container'>
    <div>
    <button type="button" onClick={handleBack}  className="mybtn"> &#8592; Back  </button>
         
    </div>
    <div>
    <button type="submit"  className="mybtn">&#10003; Save  </button>
         
    </div>
</div>
                  </form>
        </div>
    );
}
export default AddProduct;
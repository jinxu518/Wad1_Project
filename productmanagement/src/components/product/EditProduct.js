import React, { useState, useRef, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import context from '../../services/context';
import { editProduct } from '../../productNetwork';
import '../../css/editproduct.css';
function EditProduct() {
    const location = useLocation();
    let initialFormData = location.state.td;
    const navigate = useNavigate();
    const name=useRef();
    const { state, setState } = useContext(context);
    const [formData, setFormData] = useState(initialFormData);
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
        const res = await editProduct(state, formData)
        if (res.success) {
            navigate('/');
        }
    }
    const handleBack=()=>{
        navigate('/');
    };
    return (
        <div className='editprodcut-container'>
            <h1 className="login-heading-with-image">
                
        <img src="../images/logo.png" alt="Image Description" class="image rotate-image" />
       Product Management System
    </h1>
    <h4 className="home-h4">Edit Product</h4>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Product Name</label>
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
                    <label htmlFor="price">Price</label>
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
                    <label htmlFor="status">In stock</label>
                    <select id="status" className="form-control input-text" name="status" value={formData.inStock} onChange={handleInputChange}>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </div>
                <div className='btn-container'>
                <button type="button" className="mybtn" onClick={handleBack}>
                   &#8592; Back
                </button>
                <button type="submit" className="mybtn">
                    &#10003; Update
                </button>
                </div>
                
            </form>
        </div>
    );
}
export default EditProduct;

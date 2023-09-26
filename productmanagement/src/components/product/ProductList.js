import { useContext, useEffect, useState } from "react";
import context from "../../services/context";
import { getProducts } from "../../productNetwork";
import ProductDetails from "./ProductDetails";
import '../../css/productdetail.css';

function ProductList() {

    const { state, setState } = useContext(context)
    async function getData() {
        if (state.user) {
            const res = await getProducts(state.user);
            if (res && res.success) {
                setState({ ...state, products: res.data })
                console.log(res.data);
            } else {
                setState({ ...state, products: [] })
            }
        }
    }
    useEffect(() => {
        getData();
    }, [])

    return (
        <div className=".productlist-container">
            {/* <div>Status <select>
                <option value="all">All</option>
                <option value="instock">In Stock</option>
                <option value="outstock">Out Stock</option>
                </select></div> */}        
            {state.products.filter(k=>k.inStock=='true').map(x => (
                <ProductDetails key={x.id} prod={x}></ProductDetails>
            ))}
        </div>
    )
}
export default ProductList;
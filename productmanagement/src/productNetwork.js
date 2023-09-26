import axios from "axios";
axios.defaults.baseURL = "http://localhost:5001";

export async function login(user) {

    const url = "/login";
    try {
        const res = await axios.post(url, user);
        return res.data;
    } catch (error) {
        return null;
    }
}

export async function signup(user) {

    const url = "/signup";

    try {

        const res = await axios.post(url, user);

        return res.data;

    } catch (error) {

        return null;

    }
}




export async function getProducts(token) {

    const url = "/products";
    axios.defaults.headers.common["Authorization"] = `Bearer ${token.data}`
    try {
        const res = await axios.get(url);

        return res.data;
    } catch (error) {
        return null;
    }
}

export async function addProduct(token, prod) {
    const url = "/products";
    axios.defaults.headers.common["Authorization"] = `Bearer ${token.user.data}`
    try {
        const res = await axios.post(url, prod);

        return res.data;
    } catch (error) {
        return null;
    }

}


export async function editProduct(token, prod) {


    const url = "/products/" + prod.id;
    axios.defaults.headers.common["Authorization"] = `Bearer ${token.user.data}`
    try {
        const res = await axios.put(url, prod);
        return res.data;
    } catch (error) {
        return null;
    }

}

export async function deleteProduct(token, prod) {

    const url = "/products/" + prod;

    axios.defaults.headers.common["Authorization"] = `Bearer ${token.user.data}`
    try {
        const res = await axios.delete(url);
        return res.data;
    } catch (error) {
        return null;
    }

}

import axios from 'axios';

export function fetchProductData() {

    return axios.get("https://dummyjson.com/products")
}

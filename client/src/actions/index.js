import products from '../apis/products'
import { SHOW_PRODUCT, SHOW_CART, LIST_PRODUCTS, ADD_TO_CART,REMOVE_FROM_CART,SUBTRACT_QUANTITY } from './types'

export const listProducts = () => async (dispatch) => {
    const response = await products.get('/products')
    dispatch({
        type: LIST_PRODUCTS,
        payload: response.data
    })
}

export const showProduct = (id) => async (dispatch) => {
    const response = await products.get(`/products/${id}`)
    dispatch({
        type: SHOW_PRODUCT,
        payload: response.data
    })
}
export const addProduct = (item) => {
    return{
        type: ADD_TO_CART,
        payload: item
    }
}

export const subtractQuantity = (item) => {
    return{
        type: SUBTRACT_QUANTITY,
        payload: item
    }
}

export const showCart = (item) => {
    return{
        type: SHOW_CART,
        payload: item
    }
}

export const removeProduct = (id, item) => {
    return{
        type: REMOVE_FROM_CART,
        payload: id, item
    }
}
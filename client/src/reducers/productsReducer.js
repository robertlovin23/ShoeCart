import { SHOW_PRODUCT,LIST_PRODUCTS } from '../actions/types'
import _ from 'lodash'


export default (state = {},action) => {
    switch(action.type){
        case SHOW_PRODUCT: 
            return {...state, [action.payload.id]: action.payload}
        case LIST_PRODUCTS:
            return {...state, ..._.mapKeys(action.payload, 'id')}
        default:
            return state;
    }
}
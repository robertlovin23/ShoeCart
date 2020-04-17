import { ADD_TO_CART, REMOVE_FROM_CART, SHOW_CART, SUBTRACT_QUANTITY } from '../actions/types'
import _ from 'lodash'

export default (state = {}, action) => {
    switch(action.type){
        case ADD_TO_CART:
            return {...state, [action.payload.id]: action.payload}
        case SHOW_CART:
            return {...state, ..._.mapKeys(action.payload, 'id')}
        case SUBTRACT_QUANTITY:
            return {...state, [action.payload.id]: action.payload}
        case REMOVE_FROM_CART:
            return _.omit(state, [action.payload])
            // return state.filter((_,i) => i !== index)
        default:
            return state;
    }
}
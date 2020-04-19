import React from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import {showCart} from '../../actions'

class Header extends React.Component{

    renderCartLength(){
        const total = this.props.cart.map(cartItem => {
            return cartItem.userQuantity
         })
        const quantity = total.reduce((a,b) => a + b, 0)
        if(!this.props.cart.length){
            return(
                <div></div>
            );
        } else {
            return(
                <div>
                    ({quantity})
                </div>
            ) 
        }
    }
    render(){
        console.log(this.props.cart)
        return(
            <div className="ui pointing menu">
                <Link to="/" className="item">
                    DripCart
                </Link>
                <div className="right menu">
                    <Link to="/" className="item">
                        Home
                    </Link>
                    <Link to="/cart" className="item">
                        <i class="shopping cart icon"></i>
                        {this.renderCartLength()}
                    </Link>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cart: Object.values(state.cart)
    }
}

export default connect(mapStateToProps,{
    showCart
})(Header)
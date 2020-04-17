import React from 'react'
import { connect } from 'react-redux'
import StripeCheckout from 'react-stripe-checkout'

import { showCart, listProducts, removeProduct, addProduct, subtractQuantity } from '../../actions'

class ProductCart extends React.Component{
    componentDidMount(){
        this.props.showCart();
        this.props.listProducts();
    }

    onToken = (token) => {
        fetch('/save-stripe-toke', {
            method: 'POST',
            body: JSON.stringify(token),
        }).then(response => {
            response.json().then(data => {
                alert("Strip Checkout")
            })
        })
    }
    removeCart = (id) => {
        return this.props.cart.map(cartItem => {
            if(id === cartItem.id){
                if(cartItem.userQuantity >= 2){
                    cartItem.userQuantity -= 1;
                    cartItem.quantity += 1;
                    console.log(cartItem)
                    this.props.subtractQuantity(cartItem)
                } else {
                    this.props.removeProduct(id)
                }
            }
        })
    }

    addToCart = (id) => {
        return this.props.cart.map(cartItem => {
            if(id === cartItem.id && cartItem.quantity){
                if(cartItem.userQuantity >= 1){
                    cartItem.userQuantity += 1;
                    cartItem.quantity -= 1;
                    console.log(cartItem.quantity, cartItem)
                    this.props.addProduct(cartItem)
                }
            }                  
        })
    }


    renderCart(){
        const { cart } = this.props
        return cart.map(cartItems => {
            return(
                <div className="item" key={cartItems.id}>
                    <img className="ui image" src={cartItems.image} style={{width:"310px"}}/>
                    <div style={{display:"block", marginTop:"10px"}}>
                        <div className="header">
                            <b>{cartItems.name}</b>
                        </div>

                        Quantity: {cartItems.userQuantity}
                    </div>
                    <div style={{marginTop:"10px"}}>
                        <div className="ui button primary" onClick={() => this.addToCart(cartItems.id,cartItems)}>
                            Add More to Cart
                        </div>
                        <div className="ui button red" onClick={() => this.removeCart(cartItems.id)}>
                            Remove from Cart
                        </div>
                    </div>
                </div>
            )
        })
    }

    renderTotal(){
        const total = this.props.cart.map(cartItem => {
            return cartItem.price * cartItem.userQuantity
         })
        const totalPrice = total.reduce((a,b) => a + b, 0)
        return(
            <div>
                <h5 style={{display:"inline-block"}}> Total: </h5>  ${totalPrice}
            </div>
        )

    }

    render(){
        return(
            <div>
                <h3>Item Cart</h3>
                <div className="ui relaxed divided list">
                    {this.renderCart()}
                </div>
                <div>
                    {this.renderTotal()}
                </div>
                    <StripeCheckout 
                        token={this.onToken}
                        stripeKey="pk_test_RQb9JxvZ4nVw4mj6vP9t7d7k"
                    >
                        <div className="ui button primary" style={{marginTop:"10px"}}>
                            Checkout
                        </div>
                    </StripeCheckout>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        cart: Object.values(state.cart),
        products: Object.values(state.products)
    }
}

export default connect(mapStateToProps,{
    showCart,
    listProducts,
    removeProduct,
    addProduct,
    subtractQuantity
})(ProductCart)
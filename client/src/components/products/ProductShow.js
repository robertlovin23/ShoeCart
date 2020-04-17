import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import {showProduct,listProducts,addProduct} from '../../actions'

class ProductShow extends React.Component{
    componentDidMount(){
        this.props.listProducts(this.props.match.params.id);
    }

    addProduct = () => {
        const product = this.props.products
        console.log(product)
        if(product.quantity > 0){
            product.quantity -= 1;
            product.userQuantity += 1;
            this.props.addProduct(product);
        }
    }

    renderProduct = () => {
        const singleItem = this.props.products
        console.log(singleItem)

        if(!singleItem){
            return(
                <div>Loading...</div>
            )
        } else {
            return(
                <div key={singleItem.id}>
                    {singleItem.name}
                    <br/>
                    {singleItem.price}
                    <div>
                        <div onClick={() => this.addProduct(singleItem.id)}className="ui primary button">
                            Add to Cart
                        </div>
                    </div>
                </div>
            )
        }
    }
    render(){
        console.log(this.props.cart)
        return(
            <div>{this.renderProduct()}</div>
        )
    }
}

const mapStateToProps = (state,ownProps) => {
    return{
        products: state.products[ownProps.match.params.id],
        cart: state.cart
    }
}
export default connect(mapStateToProps,{
    showProduct,
    listProducts,
    addProduct
})(ProductShow)
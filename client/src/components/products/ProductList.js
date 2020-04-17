import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import {listProducts} from '../../actions'

class ProductList extends React.Component{
    componentDidMount(){
        this.props.listProducts();
    }

    renderItems(){
        const { products } = this.props
        console.log(products)
        if(!products.length){
            return(
                <div>Loading...</div>
            )
        } else {
            return products.map(product => {
                return(
                    <div className="column" key={product.id}>
                        <div className="ui card">
                            <div className="image">
                                <img src={product.image}/>
                            </div>
                            <div className="content">
                                <span className="right floated">
                                    $ {product.price}
                                </span>
                                {product.name}
                            </div>
                            <div className="extra content">
                                <Link to={`product/${product.id}`} className="ui button primary">
                                    Show More Details
                                </Link>
                            </div>
                        </div>
 
                    </div>
                )
            })
        }
    }
    render(){

        return(
            <div className="ui stackable four column grid">
                {this.renderItems()}
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        products: Object.values(state.products)
    }
}

export default connect(mapStateToProps,{
    listProducts
})(ProductList)
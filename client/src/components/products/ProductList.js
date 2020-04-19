import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import {listProducts} from '../../actions'

class ProductList extends React.Component{
    constructor(){
        super()
        this.state={
            value: "Select"
        }
    }

    componentDidMount(){
        this.props.listProducts();
        this.setState({
            value: "Select"
        })
    }

    onDropChange = (event) => {
        this.setState({
            value: event.target.value
        })
    }

    filterLowPrice(){
        const { products } = this.props
        products.sort((a,b) => {
            return b.price - a.price
        })
        console.log(products)
        this.setState({
            value: "Highest"
        })
    }

    filterHighPrice(){
        const { products } = this.props
        products.sort((a,b) => {
            return a.price - b.price
        })
        console.log(products)
        this.setState({
            value: "Lowest"
        })
    }

    changeValue = (event) => {
        console.log(event.target.value)
        if(this.state.value === "Highest"){
            this.filterLowPrice();
        } else if (this.state.value === "Lowest"){
            this.filterHighPrice();
        } else if(this.state.value === "Select"){
            this.componentDidMount();
        }
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
                                <b>{product.name}</b>
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
        <div>
            <select class="ui search dropdown" onClick={(e) => this.changeValue(e)} onChange={(e) => this.onDropChange(e)} value={this.state.value} style={{marginBottom:"15px"}}>
                <option class="item" value="Select">Select</option>
                <option class="item" value="Highest">High Price First</option>
                <option class="item" value="Lowest">Low Price First</option>
            </select>
            {/* {this.filterPrice()} */}
            <div className="ui stackable four column grid">
                {this.renderItems()}
            </div>
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
import React from 'react';
import ProductList from './products/ProductList'
import ProductShow from './products/ProductShow'
import ProductCart from './products/ProductCart'
import Header from './layout/Header'
import { BrowserRouter, Route, Switch} from 'react-router-dom'

class App extends React.Component{
  render(){
    return(
      <div className="ui container">
        <BrowserRouter>
          <Header/>
          <div>
            <Switch>
              <Route path="/" exact component={ProductList}/>
              <Route path="/cart" exact component={ProductCart}/>
              <Route path="/product/:id" exact component={ProductShow}/>
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    )
  }
}


export default App;

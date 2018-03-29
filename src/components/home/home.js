import React, { Component } from 'react';
import axios from 'axios';
import './home.css';
import '../../skeleton.css';
import '../../animate.min.css';
// Node.js
const MoltinGateway = require('@moltin/sdk').gateway;
 
const Moltin = MoltinGateway({
  client_id: 'n8ITKzWjJKa2B5nKKt1wGTxnbExbZxEHz9aw3I5KSS',
  client_secret: '4augPLy0HeDiGNv34v1mhYIdGdKTQSvpy9nrYu4biv',
});

export default class Home extends Component {
    constructor(props){
        super(props)

        this.state = {
            cart: []
        }
    }

    componentDidMount(){
        Moltin.Authenticate().then((response) => { 
            this.setState({auth: response.access_token})
            this.getProducts() });
    }

    getProducts = () => {
        Moltin.Products.All().then((products) => {
            console.log(products)
            var productsWithImages = [];
            products.data.forEach((product) => {
                axios.get(`https://api.moltin.com/v2/files/${product.relationships.main_image.data.id}`, { 'headers': { 'Authorization': `Bearer: ${this.state.auth}`} })
                .then((result) => {
                    productsWithImages.push({ id: product.id, img: result.data.data.link.href, name: product.name, description: product.description, price: product.meta.display_price.without_tax.formatted })
                })
                .then(() => { this.setProducts(productsWithImages) })
                .catch((err) => { console.log(err) })
            })
        });
    }

    setProducts = (products) => {
        let items = products.map((product) => 
            <div className="four columns product" key={product.name}>
                <img src={product.img} alt={product.name} style={{height: 100}}/>
                <h4>{product.name}</h4>
                {/* <p>{product.description}</p> */}
                <p>{product.price}</p>
                <button className="addToCart" onClick={() => this.addToCart(product.id)}>Add To Cart</button>
            </div>
        )
        this.setState({products: items})
    }

    addToCart = (id) => {
        console.log(id)
        var cart = this.state.cart;
        cart.push({pId: id, qty: 1});
        this.setState({cart: cart});
    }

    render(){
        return(
            <div>
                <div className="fullscreen animated fadeIn" id="banner" style={{ backgroundImage: 'url(' + require('./banner.jpg') + ')'}}>
                </div>
                <div style={{marginTop: 75}} className="belowthefold">
                    <div className="container">
                        <div className="row animated" id="products_container">
                            {this.state.products}
                        </div>
                        {/* <div className="row">
                            <div className="two columns offset-by-five">
                                <h1><strong>LMN</strong>drp</h1>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        )
    }
}
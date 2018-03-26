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

        this.state = {}
    }

    componentDidMount(){
        Moltin.Authenticate().then((response) => { 
            this.setState({auth: response.access_token})
            this.getProducts() });
    }

    getProducts = () => {
        Moltin.Products.All().then((products) => {
            // console.log(products.data);
            this.setProducts(products.data);
        });
    }

    setProducts = (products) => {
        products.forEach((product) => {
            axios.get(`https://api.moltin.com/v2/files/${product.relationships.main_image.data.id}`, { 'headers': { 'Authorization': `Bearer: ${this.state.auth}`} })
            .then((result) => {
                var link = result.data.data.link.href;
                var e = document.createElement("div");
                e.setAttribute('class', "four columns product")
                e.innerHTML = `
                <img src=${link} alt=${product.name} height="100"/>
                <h4>${product.name}</h4>
                <p>${product.description}</p>
                <p>${product.meta.display_price.without_tax.formatted}</p>`;
                document.getElementById('products_container').appendChild(e);
            }).catch((err) => {
                console.log(err)
            })
        })
    }

    render(){
        return(
            <div>
                <div className="fullscreen animated fadeIn" id="banner" style={{ backgroundImage: 'url(' + require('./banner.jpg') + ')'}}>
                </div>
                <div style={{marginTop: 75}} className="belowthefold">
                    <div className="container">
                        <div className="row animated" id="products_container"></div>
                        <div className="row">
                            <div className="two columns offset-by-five">
                                <h1><strong>LMN</strong>drp</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
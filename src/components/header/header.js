import React, { Component } from 'react';
// import Menu, {MenuItem} from 'rc-menu'; 
import './header.css'
import './menu.css'

export default class Header extends Component {
    constructor(props){
        super(props)
        this.state={}
    }
    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        this.setLogoSize();
    }
    
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }
    
    handleScroll = (event) => {
        var target = event.target || event.srcElement;
        var top = target.scrollingElement.scrollTop;
        this.setLogoSize(top)
    }

    setLogoSize = (top) =>{
        let products_container = document.getElementById('products_container');
        if(top > 80){
            products_container.className = 'fadeInUp ' + products_container.className;
            this.setState({
                logo: 'logo-small',
            }) 
        } else {
            products_container.classList.remove('fadeInUp')
            this.setState({
                logo: 'logo-large',
            })
        }
    }

    render(){
        return(
            <header className="App-header header-div" >
                <div>
                    <h1 className={'App-title animated fadeIn ' + this.state.logo}><strong>LMN</strong>drp</h1>
                </div>
            </header>
        )
    }
}

//menu components not in use currently
//  <div>
//     <Menu mode="horizontal" className="u-full-width menuMain menuContainer" style={{backgroundColor: 'rgba(0,0,0,0)', borderBottomColor: 'rgba(0,0,0,0)'}}>
//         <MenuItem className="menuItem" style={{marginRight: 10, marginLeft: 10, padding: '5px 20px 5px 20px'}}>shop</MenuItem>
//         <MenuItem className="menuItem" style={{marginRight: 10, marginLeft: 10, padding: '5px 20px 5px 20px'}}>about</MenuItem>
//         <MenuItem className="menuItem" style={{marginRight: 10, marginLeft: 10, padding: '5px 20px 5px 20px'}}>contact</MenuItem>
//     </Menu>
// </div>
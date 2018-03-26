import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Footer extends Component {
    constructor(props){
        super(props)

        this.state = {}
    }
    render(){
        return(
            <div>
                <div className="container">
                    <div className="row">
                        <div className="two columns" style={{textAlign: 'left'}}>
                            <ul>
                                <Link to="/"><li style={{listStyle: 'none', marginBottom: 2, fontSize: 12}}>Home</li></Link>
                                <Link to="/"><li style={{listStyle: 'none', marginBottom: 2, fontSize: 12}}>About</li></Link>
                                <Link to="/"><li style={{listStyle: 'none', marginBottom: 2, fontSize: 12}}>Contact</li></Link>
                                <Link to="/"><li style={{listStyle: 'none', marginBottom: 2, fontSize: 12}}>Blog</li></Link>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
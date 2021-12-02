import React, { Component } from 'react';
import logo_Wnoback2 from '../IMG/logo_Wnoback2.png';
import AccountLogo from '../IMG/AccountLogo.png';
import MenuLogo from '../IMG/MenuLogo.png';
import AccountNav from './AccountNav';
import './Header.css';


class Header extends Component {
    constructor() {
        super();
        this.state = {
        };
    }

    NavDisplay(){
    console.log('mouseenter')
    document.getElementById('AccNav').style.display = 'block';

    }
    render() {
        return (
            <div>
            <div id='HeaderDiv'>
                <div id="LogoDiv">
                    <img id='logo' src={logo_Wnoback2} alt="Logo" />
                    <p id="HeaderTitle">Le 16 c'est clean !</p>
                </div>
                <div id="HeaderLinkDiv">
                    <p className="HeaderLink">QUI SOMMES NOUS ?</p>
                    <p className="HeaderLink">COMMENT DECLARER ?</p>
                    <p className="HeaderLink">COMMENT AGIR ?</p>
                    <p className="HeaderLink" onMouseEnter={(e) => this.NavDisplay()}>MON COMPTE</p>
                    <img id='Alogo' src={AccountLogo} alt="AccountLogo" onMouseEnter={(e) => this.NavDisplay()}/>
  
                </div>
                <div id="HeaderMDiv">
                    <img id='Mlogo' src={MenuLogo} alt="MenuLogo" />
                </div>

            </div>
            <AccountNav />
            </div>
        );
    }
}

export default Header
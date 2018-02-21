import React from "react";
import { login, logout, isLoggedIn } from '../../utils/AuthService';
import { Link } from "react-router-dom";
import API from '../../utils/API.js';
import { Button } from "react-materialize";
import axios from "axios";
import PlaidAccountLink from "../PlaidAccountLink"

// materialize navbar
const Nav = ()=>(
        <header>
            <nav class="navbar deep-orange darken-2">
                {/* <!-- Main Menu (Desktop Dropdown) --> */}
                <ul id="desktop-main-menu" class="dropdown-content">
                    <li><a href="#!"><i class="large material-icons">account_balance</i>Accounts</a></li>
                    <li><a href="#!"><i class="large material-icons">work</i>Gigs</a></li>
                    <li><a href="#!"><i class="large material-icons">insert_chart</i>Goals</a></li>
                    <li><PlaidAccountLink><i class="large material-icons">insert_chart</i>Link Account</PlaidAccountLink></li>
                </ul>
                {/* <!-- Main Menu (Mobile Hamburger) --> */}
                <ul id="mobile-main-menu" class="side-nav">
                    <li><a href="#!"><i class="large material-icons">account_balance</i>Accounts</a></li>
                    <li><a href="#!"><i class="large material-icons">work</i>Gigs</a></li>
                    <li><a href="#!"><i class="large material-icons">insert_chart</i>Goals</a></li>
                </ul>
                {/* <!-- Navigation Bar --> */}
                <div class="nav-wrapper">
                    <a href="#!" class="brand-logo header-logo"><img src="assets/img/chedah-rnd-24x24.svg"/> chedah</a>
                    {/* <!-- Hamburger Menu Icon --> */}
                    <a href="#" data-activates="mobile-main-menu" class="button-collapse"><i class="material-icons">menu</i></a>
                    {(isLoggedIn()) ?
                    <ul class="right topnav-menu">
                        <li><a href="#!" onClick={() => logout()}>Log Out</a></li>
                        <li><a class="dropdown-button hide-on-med-and-down" href="#!" data-activates="desktop-main-menu">Menu<i class="material-icons right">arrow_drop_down</i></a></li>
                        <li><a href="#" data-activates="user-slideout" class="waves-effect waves-block waves-light user-side-collapse"><i class="material-icons">input</i></a></li>
                    </ul>
                    :
                    <ul class="right topnav-menu">
                    <li><a href="#!" onClick={() => login()}>Log In</a></li>
                    </ul>
                }
                </div>
            </nav>
        </header>
    )

export default Nav;

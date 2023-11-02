import React from 'react';
import './Footer.css';
import facebook from '../../assets/img/facebook.png'
import youtube from '../../assets/img/youtube.png'
import instagram from '../../assets/img/instagram.png'
import twitter from '../../assets/img/twitter.png'



const Footer = () => {
    return (
        <div className="footer">
            <footer>
                <div class="footer">
                    <div class="row">
                        <a href="#"><img src={facebook}/></a>
                        <a href="#"><img src={instagram}/></a>
                        <a href="#"><img src={youtube}/></a>
                        <a href="#"><img src={twitter}/></a>
                    </div>

                    <div class="row">
                        <ul>
                            <li><a href="#">Contact us</a></li>
                            <li><a href="#">Our Services</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Terms & Conditions</a></li>
                            <li><a href="#">Career</a></li>
                        </ul>
                    </div>

                    <div class="row">
                        INFERNO Copyright © 2021 Inferno - All rights reserved || Designed By: Mahesh
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer;

import React, { Component } from 'react';

import Footer from '../headerFooter/footer';
import Header from '../headerFooter/header';
import StickyLogo from "../../images/sticky-logo.svg";

import lightArrow from "../../images/arrow-light.svg";
import darkArrow from "../../images/arrow-dark.svg";

class usefulLinks extends Component {

    dark = e => (e.currentTarget.src = darkArrow);
    light = e => (e.currentTarget.src = lightArrow)
    render() {
        return (
            <div>
                 <div>
                 <div className='topNavFaq'>
					<Header />		
                </div>
                    {/* <nav className="navbar navbar-expand-lg fixed-top fixed-header   header-section ">
                        <div className="container p-0">
                           
                            <div id="sticky-logo" style={{display:'block'}} ><a href="#"><img src={StickyLogo} /></a></div>
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <span className="" id="navbarNavDropdown">
                                <ul className="navbar-nav justify-content-end">
                                    <li className="nav-item active">
                                        <a className="nav-link text-16-bold" href="#">Home </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link text-16-bold" href="#">Loans</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link text-16-bold" href="#">F.A.Qs</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link text-16-bold" href="#">Login</a>
                                    </li>

                                </ul>
                            </span>
                        </div>
                    </nav> */}
                    <div className='belowHeader'>
                        <div className="footer-first-partB">
                            <div className="container p-0">
                                <div className="still-que">Useful Links</div>
                                {/* <div className="contactno">Give us a missed call here at +91-9323-44-2345</div> */}
                            </div>
                        </div>
                        <div className="usefulLinks container p-0">
                            <ul className="text-16-semibold">
                                <li>
                                    <img src={darkArrow} onMouseOver={this.light} onMouseOut={this.dark} />
                                    <a href='https://www.amfiindia.com/'> AMFI </a>
                                </li>
                                <li>
                                    <img src={darkArrow} onMouseOver={this.light} onMouseOut={this.dark} />
                                    <a href='https://www.sebi.gov.in/'> SEBI  </a>
                                </li>
                                <li>
                                    <img src={darkArrow} onMouseOver={this.light} onMouseOut={this.dark} />
                                    <a href='https://www.bseindia.com/'> BSE </a>
                                </li>
                                <li>
                                    <img src={darkArrow} onMouseOver={this.light} onMouseOut={this.dark} />
                                    <a href='https://www.nseindia.com/'> NSE </a>
                                </li>
                                <li>
                                    <img src={darkArrow} onMouseOver={this.light} onMouseOut={this.dark} />
                                    <a href='https://www.cvlkra.com/'> CVL </a>
                                </li>
                                <li>
                                    <img src={darkArrow} onMouseOver={this.light} onMouseOut={this.dark} />
                                    <a href='https://www.rbi.org.in/'> RBI </a>
                                </li>
                                <li>
                                    <img src={darkArrow} onMouseOver={this.light} onMouseOut={this.dark} />
                                    <a href='https://www.cdslindia.com/'> CDSL </a>
                                </li>
                                <li>
                                    <img src={darkArrow} onMouseOver={this.light} onMouseOut={this.dark} />
                                    <a href='https://nsdl.co.in/'> NSDL </a>
                                </li>
                                <li>
                                    <img src={darkArrow} onMouseOver={this.light} onMouseOut={this.dark} />
                                    <a href='https://www.mutualfundssahihai.com/en'> MUTUAL FUND SAHI HAI </a>
                                </li>
                                <li>
                                    <img src={darkArrow} onMouseOver={this.light} onMouseOut={this.dark} />
                                    <a href='https://www.irdai.gov.in/'> IRDA </a>
                                </li>
                                <li>
                                    <img src={darkArrow} onMouseOver={this.light} onMouseOut={this.dark} />
                                    <a href='https://www.pfrda.org.in/'> PRFRDA </a>
                                </li>
                                <li>
                                    <img src={darkArrow} onMouseOver={this.light} onMouseOut={this.dark} />
                                    <a href='https://www.camsonline.com/'> CAMS </a>
                                </li>
                                <li>
                                    <img src={darkArrow} onMouseOver={this.light} onMouseOut={this.dark} />
                                    <a href='https://mfs.kfintech.com/mfs/'> KARVY </a>
                                </li>
                                
                            </ul>
                        </div>

                    </div>
                </div>
               
                <div><Footer/></div>
            </div>
        );
    }
}

export default usefulLinks;
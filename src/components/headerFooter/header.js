import React, { Component } from "react";
import Logo from "../../images/download.svg";
import StickyLogo from "../../images/sticky-logo.svg";
import $ from "jquery";
class HomeHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
          activeNav: props.active
        };
      }
    render() {
        $(window).scroll(function () {
            if ($(window).scrollTop() >= 100) {
                $('nav').addClass('fixed-header');
                $('#sticky-logo').css('display', 'block');
                $('#logo').css('display', 'none');
            }
            else {
                $('nav').removeClass('fixed-header');
                $('#sticky-logo').css('display', 'none');
                $('#logo').css('display', 'block');
            }
        });
        $(document).on('click', 'li.nav-item', function () { 
		
			$(this).addClass("active");
			

		});

        if ($(window).width() > 1140) {
            var leftDist = ($(window).width() - 1140) / 2;
            $(".slider-content").css({
                left: leftDist - 15
            });
        }
        $(window).resize(function () {
            if ($(window).width() > 1140) {
                var leftDist = ($(window).width() - 1140) / 2;

                $(".slider-content").css({
                    left: leftDist - 15
                });
            }
        });
      
        return (
            <header >


                <nav className="navbar navbar-expand-lg fixed-top   header-section ">
                    <div className="container p-0">
                        <div id="logo" className="" ><a href="/"><img src={Logo} /></a></div>
                        <div id="sticky-logo" className="" ><a href="/"><img src={StickyLogo} /></a></div>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <span className="" id="navbarNavDropdown">
                            <ul className="navbar-nav justify-content-end">
                                <li className="nav-item">
                                    <a className={this.state.activeNav == 1 ? 'nav-link text-16-bold active' : 'nav-link text-16-regular'} href="/">Home </a>
                                </li>
                                <li className="nav-item">
                                    <a className={this.state.activeNav == 2 ? 'nav-link text-16-bold dropdown-toggle active' : 'nav-link text-16-regular dropdown-toggle'}  href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Loans
        </a>
                                    <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                        <a  class="dropdown-item" href="/loan/home-loan">Home Loan</a>
                                        <a  class="dropdown-item" href="/loan/personal-loan">Personal Loan</a>
                                        <a class="dropdown-item" href="/loan/business-loan">Business Loan</a>
                                        <a class="dropdown-item" href="/loan/loan-against-property">Loan Against Property</a>
                                       

                                    </div>
                                </li>
                                <li className="nav-item">
                                    <a className={this.state.activeNav == 3 ? 'nav-link text-16-bold active' : 'nav-link text-16-regular'}  href="/faq">F.A.Qs</a>
                                </li>
                                <li className="nav-item">
                                    {/* <a className="nav-link text-16-bold login" href="/sign-in">Login</a> */}
                                </li>

                            </ul>

                        </span>
                    </div>
                </nav>

            </header>
        );
    }
}

export default HomeHeader;

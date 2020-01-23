import React, { Component } from "react";
import Logo from "../../images/logo.png";
import StickyLogo from "../../images/logo.png";
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
                        <div id="logo" className="" ><a href="/"><img src={Logo} width='100px'/></a></div>
                        <div id="sticky-logo" className="" ><a href="/"><img src={StickyLogo} width='100px' /></a></div>
                    </div>
                </nav>

            </header>
        );
    }
}

export default HomeHeader;

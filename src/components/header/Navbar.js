"use client"
import DelayedLink from "@/components/common/DelayedLink";
import Services from "./modals/Services";
import Market from "./modals/Market";
import Search from "./modals/Search";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

const Navbar = ({ studios, markets, searchContent }) => {
  const EXTERNAL_SITE_URL = process.env.NEXT_PUBLIC_RENTALS_URL;
  const params = useSearchParams();

  useEffect(() => {
    if (params.has("modal")) {
      const modal = params.get('modal');
      const menu = document.querySelector(`[data-get-submenu='${modal}']`);
      setTimeout(() => {
        if (menu) menu.classList.add("active");
      }, 1000);
    }
  }, []);

  return (
    <>
      <div className="cursor-wrapper" id="wrapper-cursor">
        <div>
          <span className="view text-wrapper">
            <span>view</span>
          </span>
        </div>
      </div>

      <header id="header">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12 column-header">
              <div className="wrapper-header-mobile no-desktop">
                <DelayedLink
                  to="/"
                  className="logo"
                  attributes={{
                    "data-pjax": "",
                    "aria-label": "Blueprint",
                    "data-menu-close": "",
                  }}
                >
                  <span>Blueprint</span>
                  <i className="icon-logo"></i>
                </DelayedLink>

                <button id="bt-menu" aria-label="Menu" data-search-remove>
                  <svg
                    version="1.1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="0 0 55 38.5"
                    style={{ enableBackground: "new 0 0 55 38.5" }}
                    xmlSpace="preserve"
                  >
                    <style>{`.st0 { fill: #0f41fa; }`}</style>
                    <g id="bt-menu-bars">
                      <rect
                        id="bottombar"
                        y="32.5"
                        className="st0"
                        width="55"
                        height="6"
                      />
                      <rect
                        id="middlebar"
                        y="16.4"
                        className="st0"
                        width="55"
                        height="6"
                      />
                      <rect id="topbar" className="st0" width="55" height="6" />
                    </g>
                  </svg>
                </button>
              </div>

              {/*  navbar start */}
              <nav className="menu" data-cursor-style="default">
                <div className="menu--wrapper">
                  <ul className="menu--list fs--header">
                    <li className="no-desktop">
                      <DelayedLink
                        to="/"
                        className="header-link"
                        attributes={{ "data-menu-close": "" }}
                      >
                        <span data-letter="Home">Home</span>
                      </DelayedLink>
                    </li>
                    <li>
                      <button
                        className="header-link btn-submenu"
                        data-set-submenu="services"
                      >
                        <span data-letter="Services">Services</span>
                        <i className="icon-arrow-down"></i>
                      </button>
                    </li>
                    <li>
                      <DelayedLink
                        to={EXTERNAL_SITE_URL}
                        // target={"blank"}
                        className="header-link"
                        attributes={{
                          "data-menu-close": "",
                          "data-pg-active": "pg-rental-store",
                        }}
                      >
                        <span data-letter="Rental Store">Rental Store</span>
                      </DelayedLink>
                    </li>
                    <li>
                      <button
                        className="header-link btn-submenu"
                        data-set-submenu="market"
                      >
                        <span data-letter="Market">Market</span>
                        <i className="icon-arrow-down"></i>
                      </button>
                    </li>
                    <li>
                      <DelayedLink
                        to="/portfolio"
                        className="header-link"
                        attributes={{
                          "data-menu-close": "",
                          "data-pg-active": "pg-portfolio",
                        }}
                      >
                        <span data-letter="Portfolio">Portfolio</span>
                      </DelayedLink>
                    </li>

                    <li className="no-mobile">
                      <DelayedLink
                        to="/"
                        className="logo"
                        attributes={{
                          "data-pjax": "",
                          "aria-label": "Blueprint",
                          "data-menu-close": "",
                        }}
                      >
                        <span>Blueprint</span>
                        <i className="icon-logo"></i>
                      </DelayedLink>
                    </li>

                    <li>
                      <DelayedLink
                        to="/about"
                        className="header-link"
                        attributes={{
                          "data-menu-close": "",
                          "data-pg-active": "pg-about",
                        }}
                      >
                        <span data-letter="About">About</span>
                      </DelayedLink>
                    </li>
                    <li>
                      <DelayedLink
                        to="/blog"
                        className="header-link"
                        attributes={{
                          "data-menu-close": "",
                          "data-pg-active": "pg-blog",
                        }}
                      >
                        <span data-letter="Blog">Blog</span>
                      </DelayedLink>
                    </li>
                    <li>
                      <DelayedLink
                        to="/contact"
                        className="header-link"
                        attributes={{
                          "data-menu-close": "",
                          "data-pg-active": "pg-contact",
                        }}
                      >
                        <span data-letter="Contact">Contact</span>
                      </DelayedLink>
                    </li>
                    <li>
                      <button
                        className="header-link link-search no-mobile"
                        data-set-submenu="search"
                        data-search-remove
                      >
                        <i className="icon-search"></i>
                        <span data-letter="Search">Search</span>
                      </button>
                    </li>
                  </ul>
                </div>
              </nav>
              {/* navbar end */}

              <div className="submenu-services submenu" data-get-submenu="services">
                <Services data={studios} />
              </div>
              <div className="submenu-market submenu" data-get-submenu="market">
                <Market data={markets} />
              </div>
              <Search studios={studios} markets={markets} searchContent={searchContent} />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;

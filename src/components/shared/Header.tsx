import React from "react";
import { IconLogo } from "../../resources/svg/IconLogo";
import {
  IconBookmark,
  IconHome,
  IconMovie,
  IconTv,
} from "../../resources/svg/nav/IconsNav";
import { Link, NavLink } from "react-router-dom";
import avatar from "../../resources/images/avatar.jpeg";

function Header() {
  return (
    <header
      id="header_container"
      className="w-full h-14 md:h-[72px] lg:h-[100svh] flex justify-center lg:flex-col lg:px-0  relative"
    >
      <div className="h-14 md:h-[72px] w-full relative z-40 lg:h-full">
        <div
          id="sticky"
          className="max-w-full h-14 fixed top-0 pt-6 bg-black lg:left-0 lg:pl-6"
        >
          <nav className="bg-darkBlue h-14 w-full flex justify-between items-center px-4 md:h-[72px] rounded-xl lg:h-full lg:w-[92px] lg:flex-col lg:py-8 lg:gap-20">
            <div className="h-7 aspect-square md:h-8">
              <Link to="/">
                <IconLogo />
              </Link>
            </div>
            <div className="flex justify-between items-center gap-6 md:gap-10 lg:flex-col">
              <NavLink to="/" state="homePage">
                {({ isActive }) => (
                  <IconMovie
                    className={
                      isActive ? "fill-white" : "fill-blue hover:fill-red"
                    }
                  />
                )}
              </NavLink>
              <NavLink to="/animes" state="animesPage">
                {({ isActive }) => (
                  <IconTv
                    className={
                      isActive ? "fill-white" : "fill-blue hover:fill-red"
                    }
                  />
                )}
              </NavLink>

              <NavLink to="/mylist" state="bookmarkPage">
                {({ isActive }) => (
                  <IconBookmark
                    className={
                      isActive ? "fill-white" : "fill-blue hover:fill-red"
                    }
                  />
                )}
              </NavLink>
            </div>
            <div className="grid place-content-center h-7 md:h-8">
              <img className="w-10 h-10 rounded-full" src={avatar} alt="" />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

export { Header };

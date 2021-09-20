import React from "react";
import { Link, withRouter } from "react-router-dom";

function Navigation(props) {
  return (
    <div className="navigation">
      <nav class="flex items-center bg-gray-800 p-3 flex-wrap">
      <a href="/"class="p-2 mr-4 inline-flex items-center">
        <span class="text-xl text-white font-bold tracking-wide"
          >RateMyHall</span>
      </a>
      <button
        class="text-white inline-flex p-3 hover:bg-gray-900 rounded lg:hidden ml-auto hover:text-white outline-none nav-toggler"
        data-target="#navigation"
      >
        <i class="material-icons">menu</i>
      </button>
      <div
        class="hidden top-navbar w-full lg:inline-flex lg:flex-grow lg:w-auto"
        id="navigation"
      >
        <div
          class="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start  flex flex-col lg:h-auto"
        >
          
          <a
            class="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white"
          >
            <Link class="nav-link" to="/">
                  Home
                  <span class="sr-only">(current)</span>
                </Link>
          </a>
          <a
            
            class="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white"
          >
            <Link class="nav-link" to="/about">
                  About
                </Link>
          </a>
          <a
            
            class="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white"
          >
            <Link class="nav-link" to="/contact">
                  Contact
                </Link>
          </a>
        </div>
      </div>
    </nav>
    </div>
    
  );
}

export default withRouter(Navigation);
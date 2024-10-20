// import React from "react";
// import { BiUser } from "react-icons/bi";
// import { FaSearch, FaShoppingBag } from "react-icons/fa";
// import { Link } from "react-router-dom";

// const Navbar = () => {
//   return (
//     <>
//       <header className="flex justify-around items-center w-full p-4 m-4">
//         <nav>
//           <ul className="flex items-center justify-between gap-x-4">
//             <li>
//               <Link to={"/"} className="hover:text-red-600">
//                 Home
//               </Link>
//             </li>
//             <li>
//               <Link to={"/"} className="hover:text-red-600">
//                 Shop
//               </Link>
//             </li>
//             <li>
//               <Link to={"/"} className="hover:text-red-600">
//                 Pages
//               </Link>
//             </li>
//             <li>
//               <Link to={"/"} className="hover:text-red-600">
//                 Contact Us
//               </Link>
//             </li>
//           </ul>
//         </nav>

//         <div className="font-bold text-2xl">E-Commerece</div>

//         <div className="flex justify-between items-center gap-x-7">
//           <FaSearch />
//           <FaShoppingBag />
//           <BiUser />
//         </div>
//       </header>
//     </>
//   );
// };

// export default Navbar;
import React, { useState } from "react";
import { BiUser } from "react-icons/bi";
import { FaSearch, FaShoppingBag } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <header className="flex justify-between items-center w-full p-4 m-4 bg-white">
        <div className="flex items-center">
          <div className="font-bold text-2xl">E-Commerce</div>
          <button className="ml-4 md:hidden" onClick={toggleMenu}>
            {isOpen ? "Close" : "Menu"}
          </button>
        </div>

        <nav
          className={`md:flex ${
            isOpen ? "block" : "hidden"
          } absolute md:static bg-white md:bg-transparent top-20 left-0 w-full md:w-auto`}
        >
          <ul className="flex flex-col md:flex-row md:items-center md:justify-between gap-x-4 md:gap-x-6 p-4 md:p-0">
            <li>
              <Link to="/" className="hover:text-red-600">
                Home
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-red-600">
                Shop
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-red-600">
                Pages
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-red-600">
                Contact Us
              </Link>
            </li>
          </ul>
        </nav>

        <div className="hidden md:flex justify-between items-center gap-x-7">
          <FaSearch />
          <FaShoppingBag />
          <BiUser />
        </div>
      </header>
    </>
  );
};

export default Navbar;

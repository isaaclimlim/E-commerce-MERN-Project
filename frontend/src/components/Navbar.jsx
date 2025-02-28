import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CartModal from "../pages/shop/CartModal";
import avatarImg from "../assets/avatar.png";
import { useLogoutUserMutation } from "../redux/features/auth/authApi";
import { logout } from "../redux/features/auth/authSlice";

const Navbar = () => {
  const products = useSelector((state) => state.cart.products);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [logoutUser] = useLogoutUserMutation();
  const navigate = useNavigate();

  // Admin dropdown menus
  const adminDropDownMenu = [
    { label: "Dashboard", path: "/dashboard/admin" },
    { label: "Manage Items", path: "/dashboard/manage-products" },
    { label: "All Orders", path: "/dashboard/manage-orders" },
    { label: "Add New Post", path: "/dashboard/add-new-post" },
  ];

  // User dropdown menus
  const userDropDownMenu = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Profile", path: "/dashboard/profile" },
    { label: "Payments", path: "/dashboard/payments" },
    { label: "Orders", path: "/dashboard/orders" },
  ];

  const dropdownMenus =
    user?.role === "admin" ? adminDropDownMenu : userDropDownMenu;

  // Handlers
  const handleCartToggle = () => {
    setIsCartOpen((prev) => !prev);
  };

  const handleDropDownToggle = () => {
    setIsDropDownOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
      navigate('/');
    } catch (error) {
      console.error("Failed to logout");
    }
  };

  return (
    <header className="fixed-nav-bar w-nav">
      <nav className="max-w-screen-2xl mx-auto px-4 flex justify-between items-center">
        {/* Navigation Links */}
        <ul className="nav__links">
          <li className="link">
            <Link to="/">Home</Link>
          </li>
          <li className="link">
            <Link to="/shop">Shop</Link>
          </li>
          <li className="link">
            <Link to="/pages">Pages</Link>
          </li>
          <li className="link">
            <Link to="/contact">Contact</Link>
          </li>
        </ul>

        {/* Logo */}
        <div className="nav__logo">
          <Link to="/">
            OLLIE<span>.</span>
          </Link>
        </div>

        {/* Icons and User Info */}
        <div className="nav__icons relative">
          <Link to="/search" className="hover:text-primary">
            <i className="ri-search-line"></i>
          </Link>
          <button onClick={handleCartToggle} className="hover:text-primary">
            <i className="ri-shopping-bag-line"></i>
            <sup className="text-sm inline-block px-1.5 text-white rounded-full bg-primary text-center">
              {products.length}
            </sup>
          </button>

          {user ? (
            <div className="flex items-center relative">
              <img
                onClick={handleDropDownToggle}
                src={user.profileImage || avatarImg}
                alt="User Avatar"
                className="w-8 h-8 rounded-full cursor-pointer"
              />
              {isDropDownOpen && (
                <div
                  className="absolute right-0 mt-2 bg-white shadow-xl rounded-md p-2 z-10 border border-gray-200"
                  style={{ top: "100%" }} // Ensures dropdown appears below the avatar
                >
                  <ul>
                    {dropdownMenus.map((menu, index) => (
                      <li key={index}>
                        <Link
                          onClick={() => setIsDropDownOpen(false)}
                          className="block px-4 py-2 hover:bg-gray-100"
                          to={menu.path}
                        >
                          {menu.label}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <Link onClick={handleLogout} className="dropdown-items hover:bg-gray-100 block px-4 py-2">Logout</Link>
                    </li>
                  </ul>
                </div>
              )}

              <span className="ml-2 text-sm font-semibold text-gray-800">
                {user.username || user.email}
              </span>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold text-sm px-4 py-2 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out"
            >
              Login
            </Link>
          )}
        </div>
      </nav>

      {/* Cart Modal */}
      {isCartOpen && (
        <CartModal
          products={products}
          isOpen={isCartOpen}
          onClose={handleCartToggle}
        />
      )}
    </header>
  );
};

export default Navbar;
 
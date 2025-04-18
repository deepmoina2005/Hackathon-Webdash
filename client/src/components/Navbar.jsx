import React, { useEffect, useCallback, useState } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { Button } from "./ui/button";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const {
    user,
    setUser,
    setShowUserLogin,
    navigate,
    setSearchQuery,
    searchQuery,
    getCartCount,
    axios,
  } = useAppContext();

  const logout = useCallback(async () => {
    try {
      const { data } = await axios.get("/api/user/logout");
      if (data.success) {
        toast.success(data.message);
        setUser(null);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  }, [axios, navigate, setUser]);

  useEffect(() => {
    if (searchQuery.length > 0) {
      navigate("/products");
    }
  }, [searchQuery, navigate]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const SearchBar = () => (
    <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 py-1.5 rounded-full bg-white">
      <input
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full bg-transparent outline-none placeholder-gray-500"
        type="text"
        placeholder="Search products"
      />
      <img src={assets.search_icon} alt="search" className="w-4 h-4" />
    </div>
  );

  return (
    <nav
      className={`flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 transition-all z-50 fixed w-full top-0 ${
        isScrolled
          ? "bg-white/70 backdrop-blur-md border-gray-200 shadow-sm"
          : "bg-white"
      }`}
    >
      {/* Logo */}
      <NavLink to="/" onClick={() => setOpen(false)}>
        <img className="h-9" src={assets.logo} alt="logo" />
      </NavLink>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/products">All Product</NavLink>
        <NavLink to="/categories">Category</NavLink>
        <NavLink to="/">Contact</NavLink>
        <SearchBar />

        {/* Cart */}
        <div
          onClick={() => navigate("/cart")}
          className="relative cursor-pointer"
        >
          <img src={assets.cart_icon} alt="cart" className="w-6 opacity-80" />
          <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">
            {getCartCount()}
          </button>
        </div>

        {/* User Profile */}
        {!user ? (
          <button
            onClick={() => setShowUserLogin(true)}
            className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full"
          >
            Login
          </button>
        ) : (
          <div className="relative group">
            <img src={assets.profile_icon} className="w-10" alt="profile" />
            <ul className="hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-gray-200 py-2.5 w-32 rounded-md text-sm z-40">
              <li
                onClick={() => navigate("/my-orders")}
                className="p-1.5 pl-3 hover:bg-primary/10 cursor-pointer"
              >
                My Orders
              </li>
              <li
                onClick={logout}
                className="p-1.5 pl-3 hover:bg-primary/10 cursor-pointer"
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Mobile Buttons */}
      <div className="flex items-center gap-6 sm:hidden">
        <div
          onClick={() => navigate("/cart")}
          className="relative cursor-pointer"
        >
          <img src={assets.cart_icon} alt="cart" className="w-6 opacity-80" />
          <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">
            {getCartCount()}
          </button>
        </div>
        <button onClick={() => setOpen(!open)} aria-label="Toggle Menu">
          <img src={assets.menu_icon} alt="menu" />
        </button>
      </div>

      {/* Sliding Mobile Menu */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-white shadow-lg z-50 flex flex-col gap-6 p-6 pt-20 text-sm transition-all duration-300 ${
          open ? "translate-x-0" : "-translate-x-80"
        }`}
      >
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 text-2xl"
        >
          ✕
        </button>
        <NavLink to="/" onClick={() => setOpen(false)}>
          Home
        </NavLink>
        <NavLink to="/products" onClick={() => setOpen(false)}>
          All Product
        </NavLink>
        {user && (
          <NavLink to="/my-orders" onClick={() => setOpen(false)}>
            My Orders
          </NavLink>
        )}
        <NavLink to="/" onClick={() => setOpen(false)}>
          Contact
        </NavLink>
        {!user ? (
          <Button
            onClick={() => {
              setOpen(false);
              setShowUserLogin(true);
            }}
            className="cursor-pointer px-6 py-2 hover:bg-primary-dull transition text-white rounded-full text-sm"
          >
            Login
          </Button>
        ) : (
          <button
            onClick={logout}
            className="cursor-pointer px-6 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

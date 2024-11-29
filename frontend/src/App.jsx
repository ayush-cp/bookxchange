import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import BookSearch from "./components/BookSearch/BookSearch";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import BookExchangeLogin from "./components/loginregister/LoginRegister";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Define route for Home */}
          <Route path="/" element={<Home />} />

          <Route path="/booksearch" element={<BookSearch />} />

          {/* Define route for Profile Page */}
          <Route path="/profile" element={<ProfilePage />} />

          {/* Define route for BookExchangeLogin */}
          <Route path="/bookexchangelogin" element={<BookExchangeLogin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

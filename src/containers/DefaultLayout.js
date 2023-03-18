import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import routes from "../routes";
import Header from "./Header";
import { useSelector } from "react-redux";
const DefaultLayout = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <>
      {!isLoggedIn ? (
        <Navigate to="/login" />
      ) : (
        <>
          <Header></Header>
          <Routes>
            {routes.map((route, idx) => (
              <Route key={idx} path={route.path} element={route.component} />
            ))}
          </Routes>
        </>
      )}
    </>
  );
};

export default DefaultLayout;

import Home from "./pages/Home";
import Login from "./pages/Login";
import NetworkError from "./pages/NetworkError";
import NoPermission from "./pages/NoPermission";
import NotFound from "./pages/NotFound";
import Product from "./pages/Product";
import Category from "./pages/Category";

const routes = [
  { path: "", component: <Home /> },
  { path: "home", component: <Home /> },
  { path: "product", component: <Product /> },
  { path: "category", component: <Category /> },
  // { path: "login", component: <Login /> },
  { path: "not-found", component: <NotFound /> },
  { path: "network-error", component: <NetworkError /> },
  { path: "no-permission", component: <NoPermission /> },
  { path: "*", component: <NotFound /> },
];
export default routes;

import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import { ShoppingCartProvider, UserProvider } from "../../Context";
import Home from "../Home";
import MyAccount from "../MyAccount";
import MyOrder from "../MyOrder";
import MyOrders from "../MyOrders";
import NotFound from "../NotFound";
import SignIn from "../SignIn";

import { Users } from "../../Services/AuthService";

import "./App.css";
import { useEffect } from "react";
import { useLocalStorage } from "../../Hooks";
import { Auth } from "../../Constants/Keys";
import { Layout } from "../../Layouts/Layout";

function isLoggedIn() {
  const loggedIn = localStorage.getItem(Auth.LOGGED_IN);
  return loggedIn;
}

function loggedInGuard() {
  if (!isLoggedIn()) return redirect("/sign-in");
  else return null;
}

let routers = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/clothes", element: <Home /> },
      { path: "/electronics", element: <Home /> },
      { path: "/furnitures", element: <Home /> },
      { path: "/toys", element: <Home /> },
      { path: "/others", element: <Home /> },
      { path: "/my-account", element: <MyAccount />, loader: loggedInGuard },
      { path: "/my-order", element: <MyOrder />, loader: loggedInGuard },
      { path: "/my-orders", element: <MyOrders />, loader: loggedInGuard },
      { path: "/my-orders/last", element: <MyOrder />, loader: loggedInGuard },
      { path: "/my-orders/:id", element: <MyOrder />, loader: loggedInGuard },
      {
        path: "/sign-in",
        element: <SignIn />,
        loader: async () => {
          if (isLoggedIn()) return redirect("/");
          return null;
        },
      },
      { path: "/*", element: <NotFound /> },
    ],
  },
]);

const App = () => {
  const { getItem: getUsers, saveItem: saveUsers } = useLocalStorage(
    Auth.ALL_USERS
  );
  useEffect(() => {
    if (!getUsers()) saveUsers(Users);
  }, [getUsers, saveUsers]);

  return (
    <UserProvider>
      <ShoppingCartProvider>
        <RouterProvider router={routers} />
      </ShoppingCartProvider>
    </UserProvider>
  );
};

export default App;

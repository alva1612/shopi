import { useContext } from "react";
import Layout from "../../Components/Layout";
import { UserContext } from "../../Context";
import { useNavigate } from "react-router-dom";

function MyAccount() {
  const { loggedIn, signOut } = useContext(UserContext);
  const navigate = useNavigate();

  const onSignOut = () => {
    signOut();
    navigate("/");
  };
  return (
    <Layout>
      <div className="logIn_container flex flex-col gap-2">
        <div className="inputGroup">
          <label
            className="block text-sm font-medium leading-6 text-gray-900"
            htmlFor="username"
          >
            Username:
          </label>
          <input
            className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            type="text"
            id="username"
            value={loggedIn?.username}
            disabled
          />
        </div>
        <div className="inputGroup sm:col-span-3">
          <label
            className="block text-sm font-medium leading-6 text-gray-900"
            htmlFor="password"
          >
            Password:{" "}
          </label>
          <input
            className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            type="password"
            id="password"
            value={loggedIn?.password}
            disabled
          />
        </div>
        <input
          className="rounded-md bg-indigo-600 px-3 py-2 mt-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
          type="button"
          value="Sign out"
          onClick={onSignOut}
        />
      </div>
    </Layout>
  );
}

export default MyAccount;

import { useForm } from "react-hook-form";
import Layout from "../../Components/Layout";
import { useLocalStorage } from "../../Hooks";
import { Auth } from "../../Constants/Keys";
import { useEffect, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";

function SignIn() {
  const {
    getItem: getUserCreds,
    saveItem: saveUserCred,
    clearItem: clearUserCred,
  } = useLocalStorage(Auth.SAVED);
  const { saveItem: saveLoggedIn } = useLocalStorage(Auth.LOGGED_IN);
  const { getItem: getAllUsers } = useLocalStorage(Auth.ALL_USERS);

  const [savedCreds, setSavedCreds] = useState();
  const { register, handleSubmit } = useForm({
    defaultValues: { username: "", password: "", save: false },
    values: savedCreds,
  });

  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (savedCreds) return;

    const localStorageCreds = getUserCreds();
    if (!localStorageCreds) return;

    setSavedCreds({ ...localStorageCreds, save: true });
  }, [getUserCreds, savedCreds]);

  const onSignIn = (data) => {
    const allUsers = getAllUsers();
    const match = allUsers.find(
      (user) =>
        user.password === data.password && user.username === data.username
    );
    if (!match) {
      setErrorMessage("Wrong credentials");
      return;
    }

    setErrorMessage("");
    saveLoggedIn(match);
    console.log(match);

    navigate("/");

    if (data.save) saveUserCred(data);
    else clearUserCred();
  };

  return (
    <Layout>
      <div className="logIn_container">
        <form
          className="logIn_form flex flex-col gap-2 justify-end"
          onSubmit={handleSubmit(onSignIn)}
        >
          <div className="inputGroup">
            <label
              className="block text-sm font-medium leading-6 text-gray-900"
              htmlFor="username"
            >
              Username:{" "}
            </label>
            <input
              className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              type="text"
              id="username"
              {...register("username")}
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
              {...register("password")}
            />
          </div>
          <div className="inputGroup flex gap-x-3 justify-end">
            <div className="flex h-4 items-center">
              <input
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                type="checkbox"
                id="save"
                {...register("save")}
              />
            </div>
            <label
              className="font-normal leading-4 text-sm text-gray-900"
              htmlFor="password"
            >
              Save user{" "}
            </label>
          </div>
          <input
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
            type="submit"
          />
        </form>
        {errorMessage.length > 0 && <p>{errorMessage}</p>}
      </div>
    </Layout>
  );
}

export default SignIn;

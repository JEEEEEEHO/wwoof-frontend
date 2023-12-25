import { Outlet, useLoaderData, useNavigation } from "react-router-dom";
import MainNavigation from "./MainNavigation";
import FooterNavigation from "./FooterNavigation";
import { useEffect } from "react";
import WishProvider from "../store/WishProvider";

function RoutLayout() {
  const navigation = useNavigation();
  const token = useLoaderData();
  // const navigation = useNavigation();
  console.log("RootLayout" + token);

  useEffect(() => {
    if (token === "") {
      return;
    }
  }, [token]);

  return (
    <>
      <WishProvider>
        <MainNavigation />
        <main>
          {navigation.state === "loading..." && <p>Loading...</p>}
          <Outlet></Outlet>
        </main>
        <FooterNavigation />
      </WishProvider>
    </>
  );
}

export default RoutLayout;

import { Outlet, useLoaderData, useNavigation} from "react-router-dom";
import MainNavigation from "./MainNavigation";
import FooterNavigation from "./FooterNavigation";
import { useEffect } from "react";

function RoutLayout() {
  const navigation = useNavigation();
  const token = useLoaderData();
  // const navigation = useNavigation();

  useEffect(() => {
    if (token === '') {
      return;
    }

  }, [token]);


  return (
    <>
      <MainNavigation />
      <main>
        {navigation.state === "loading..." && <p>Loading...</p>}
        <Outlet></Outlet>
      </main>
      <FooterNavigation />
      
    </>
  );
}

export default RoutLayout;

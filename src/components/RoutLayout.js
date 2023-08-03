import { Outlet, useNavigation } from "react-router-dom";
import MainNavigation from "./MainNavigation";
import FooterNavigation from "./FooterNavigation";

function RoutLayout() {
  const navigation = useNavigation();

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

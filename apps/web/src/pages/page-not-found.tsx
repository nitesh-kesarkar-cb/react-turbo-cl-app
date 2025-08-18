import { Link } from "@tanstack/react-router";
import AppH2 from "../components/h2";
import AppP from "../components/p";
import AppDiv from "../components/div";

function PageNotFoundPage() {
  return (
    <AppDiv style={{ textAlign: "center", padding: "50px" }}>
      <AppH2>404</AppH2>
      <AppP>Oops! The page you’re looking for doesn’t exist.</AppP>
      <Link to="/login">Go back to login</Link>
    </AppDiv>
  );
}

export default PageNotFoundPage;

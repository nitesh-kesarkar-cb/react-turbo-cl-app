import AppDiv from "../components/div";
import AppH2 from "../components/h2";
import AppP from "../components/p";

function NoAccessPage() {
  return (
    <AppDiv>
      <AppH2>Access Denied</AppH2>
      <AppP>You do not have permission to view this page.</AppP>
    </AppDiv>
  );
}

export default NoAccessPage;

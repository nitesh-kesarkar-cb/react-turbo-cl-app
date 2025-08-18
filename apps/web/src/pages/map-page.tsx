import AppDiv from "../components/div";
import AppH2 from "../components/h2";
import MapViewWithMarker from "../components/map-view-with-marker";

export const MapPage = () => {
  return (
    <AppDiv>
      <AppH2>Map Page</AppH2>
      <MapViewWithMarker />
    </AppDiv>
  );
};

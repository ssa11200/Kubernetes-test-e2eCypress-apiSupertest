import { ILocation } from "../types/ILocation";

export const createLatLng = (location: ILocation) => {
  const lat = location.coordinates[1];
  const lng = location.coordinates[0];

  const position = new google.maps.LatLng(lat, lng);

  return position;
};

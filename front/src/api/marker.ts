import { kyApi } from './api';

interface Marker {
  libelle: string;
  latitude: number;
  longitude: number;
}

interface IMarker extends Marker {
  _id: string;
}

const addMarker = (marker: Marker) =>
  kyApi.post('markers', { json: marker }).json();
const getMarkers = () => kyApi.get('markers').json();
const editMarker = (marker: IMarker) =>
  kyApi.put(`markers/${marker._id}`, { json: marker }).json();
const deleteMarker = (id: string) => kyApi.delete(`markers/${id}`).json();

export { addMarker, getMarkers, editMarker, deleteMarker };

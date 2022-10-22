import { kyApi } from './api';

interface Marker {
  _id: string;
  libelle: string;
  latitude: number;
  longitude: number;
}

const addMarker = (marker: Marker) =>
  kyApi.post('markers', { json: marker }).json();
const getMarkers = () => kyApi.get('markers').json();
const editMarker = (marker: Marker) =>
  kyApi.put(`markers/${marker._id}`, { json: marker }).json();
const deleteMarker = (id: string) => kyApi.delete(`markers/${id}`).json();

export { addMarker, getMarkers, editMarker, deleteMarker };

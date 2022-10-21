import { kyApi } from './api';

const addMarker = (marker: any) =>
  kyApi.post('markers', { json: marker }).json();
const getMarkers = () => kyApi.get('markers').json();
const editMarker = (marker: any) =>
  kyApi.put(`markers/${marker._id}`, { json: marker }).json();
const deleteMarker = (id: string) => kyApi.delete(`markers/${id}`).json();

export { addMarker, getMarkers, editMarker, deleteMarker };

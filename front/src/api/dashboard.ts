import { kyApi } from './api';

const getWeather = () => kyApi.get('dashboard/weather').json();
const getMCQData = () => kyApi.get('dashboard/mcq').json();

export { getWeather, getMCQData };

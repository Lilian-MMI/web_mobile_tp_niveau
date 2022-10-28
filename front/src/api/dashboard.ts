import { kyApi } from './api';

const getWeather = () => kyApi.get('dashboard/weather').json();

export { getWeather };

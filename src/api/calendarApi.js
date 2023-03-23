import axios from 'axios';
import { getEvenVariables } from '../helpers/getEnvVariables';

const { VITE_API_URL } = getEvenVariables();

const calendarApi = axios.create({
  baseURL: VITE_API_URL,
});

//Configurar interceptores

export default calendarApi;

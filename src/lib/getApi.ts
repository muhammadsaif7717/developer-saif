import axios from 'axios';
import { getUrl } from './getUrl';

let url: string;

// Initialize the URL
const initializeURL = async () => {
  url = await getUrl();
};
initializeURL();

// Get passed student resuklts
export const getProjects = async () => {
  try {
    const res = await axios.get(`${url}/projects/get`);
    return res.data.res;
  } catch (err) {
    throw new Error(`Failed to get results: ${err}`);
  }
};

// Get by id
export const getProjectsById = async (id: string) => {
  try {
    const res = await axios.get(`${url}/projects/get/${id}`);
    return res.data.res;
  } catch (err) {
    throw new Error(`Failed to get results: ${err}`);
  }
};

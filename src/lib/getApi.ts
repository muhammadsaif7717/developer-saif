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

// Get failed student resuklts
export const getFailedStudents = async () => {
  try {
    const res = await axios.get(`${url}/result/failed`);
    return res.data.results;
  } catch (err) {
    throw new Error(`Failed to get results: ${err}`);
  }
};

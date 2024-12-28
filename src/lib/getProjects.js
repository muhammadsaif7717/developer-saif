import axios from 'axios';
import { getURL } from './getURL';

export const getProjects = async () => {
  try {
    const url = await getURL();
    const res = await axios.get(`${url}/api/get-all-projects`);
    return res.data.res;
  } catch (error) {
    console.log(error);
    return [];
  }
};

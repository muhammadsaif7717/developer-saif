import axios from 'axios';
import { getURL } from './getURL';

export const getBlogs = async () => {
  try {
    const url = await getURL();
    const res = await axios.get(`${url}/api/get-all-blogs`);
    return res.data.res;
  } catch (error) {
    console.log(error);
  }
};

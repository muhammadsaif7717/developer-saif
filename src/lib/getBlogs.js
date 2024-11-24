import axios from 'axios';
import { getURL } from './getURL';

export const getBlogs = async () => {
  try {
    const res = await axios.get(`${await getURL()}/api/get-all-blogs`);
    return res.data.res;
  } catch (error) {
    console.log(error);
  }
};

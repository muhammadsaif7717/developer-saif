import axios from "axios";
import { getURL } from "./getURL";


export const getProjectById = async (id) => {
    try {
        const url = await getURL();
        const res = await axios.get(`${url}/api/get-project-by-id/${id}`);
        return res.data.res;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

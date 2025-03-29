import { Config } from "./helper";
import axios from "axios";
export const request = async (url = "") => {
  return axios({
    url: Config.base_url + url,
    fetchAll: () => axios.get(url),
    create: (newRecord) => axios.post(url, newRecord),
    update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
    delete: (id) => axios.delete(url + id),
  });
};

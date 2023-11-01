import axios from "axios";
import backend_url from "@/globals/globals";
export default {
    async searchResultsFromAPI({ commit }, searchKey) {
        console.log("HERE I AM");
        try {
          const res = await axios.get(
            `${backend_url}/courses/fuzzysearch?search=${searchKey}`,
          );
          commit("setSearchResults", res.data)
        } catch (error) {
          return error;
        }
    },
} 
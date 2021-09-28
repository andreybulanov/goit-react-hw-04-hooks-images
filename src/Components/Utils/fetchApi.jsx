import axios from "axios";

export const fetchImages = async (name, page) => {
  const URL = "https://pixabay.com/api";
  const API_KEY = "22635337-a2d7cfd18b30a4b0e9b9bd466";

  const response = await axios.get(
    `${URL}/?q=${name}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response.data.hits;
};





// 22635337-a2d7cfd18b30a4b0e9b9bd466
// https://pixabay.com/api/

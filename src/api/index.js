import axios from 'axios';

const endpoint = 'https://api.flickr.com/services/rest/';
const apiKey = '11c40ef31e4961acf4f98c8ff4e945d7';

export const getFlickrPhotosRequest = async params => {
  return await axios.get(endpoint, {
    params: {
      text: params.text,
      api_key: apiKey,
      method: 'flickr.photos.search',
      format: 'json',
      nojsoncallback: 1,
      page: params.page,
      per_page: 8,
    },
  });
};

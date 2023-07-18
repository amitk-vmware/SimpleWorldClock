const PLACES_API_HOST = 'http://geodb-free-service.wirefreethought.com/v1';

// http://geodb-free-service.wirefreethought.com/v1/geo/places?namePrefix=new%20york%20&hateoasMode=false&limit=5&offset=0&sort=-population
export const placesApi = async text => {
  try {
    const response = await fetch(
      `${PLACES_API_HOST}/geo/places?` +
        new URLSearchParams({
          namePrefix: text,
          hateoasMode: false,
          offset: 0,
          sort: '-population',
        }),
    );
    const places = await response.json();
    return places.data;
  } catch (e) {
    console.log(`Unable to fetch location due to: ${e}`);
  }
};

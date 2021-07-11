const UNSPLASH_ACCESS_KEY = "5B1mydUP59yeovuFaese0w6aQ_bESt926pvoKALZPkg"

const UNSPLASH_CLIENT_ID_FIELD = `Client-ID ${UNSPLASH_ACCESS_KEY}`

const UNSPLASH_AUTH_HEADERS = {
	headers: {
		Authorization: UNSPLASH_CLIENT_ID_FIELD
	}
}

const UNSPLASH_BASE_PATH = "https://api.unsplash.com"

export const unsplashFetch = (path) => {

	return function (link_params) {

		let fetch_link = `${UNSPLASH_BASE_PATH}/${path}` 
		if (link_params !== ""){
			fetch_link += `${link_params}`;
		}
		
		return fetch(fetch_link, UNSPLASH_AUTH_HEADERS).then( response => response.json())

	}
}

import { useEffect, useState } from "react";
import { useParams } from "react-router";

import Terminal from '../Terminal'
import { unsplashFetch } from '../../utils/unsplash_api'

function PhotoView ({console_ref}) {

	const [photo_data, setCurrentPhotoData] = useState({});

	const collection_id = useParams()["collectionId"];
	const photo_id = useParams()["photoId"];

	useEffect( () => {

		console_ref.current.insertCommand(`show-image ./collections/${collection_id}/${photo_id}`)

		unsplashFetch(`photos/${photo_id}`)("").then( (current_photo_data) => {

			setCurrentPhotoData(current_photo_data);

		});

		console.log(photo_data);

	}, [photo_id])
	
	return(
		<Terminal title="Photo Preview">
		</Terminal>
	)
}

export default PhotoView;
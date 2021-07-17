import './CollectionPreview.scss'
import { useEffect, useState, useContext } from 'react';

import InfiniteScroll from 'react-infinite-scroll-component'

import { unsplashFetch } from '../../utils/unsplash_api';

import CollectionMiniature from '../../components/CollectionMiniature';
import CollectionDescription from '../../components/CollectionDescription';

import { MinSplashBrowserContext } from '../MinSplashBrowser';
import { useParams } from 'react-router-dom';

const INITIAL_PHOTOS_NUMBER = 12;
const PHOTOS_TO_APPEND = 30;

function CollectionPreview() {

	const collection_id = useParams()["collectionId"]
	const current_context = useContext(MinSplashBrowserContext);

	const console_ref = current_context.console_ref;
	const total_photos = current_context.collection.total_photos;

	const [collection_photos, setCollectionPhotos] = useState([]);
	const [collection_page, setCollectionPage] = useState(1);

	const [infinite_scroll_height, setInfiniteScrollHeight] = useState();

	function fetchCollectionPhotos () {

		console.log(collection_photos)

		if ( collection_page === 1 ){

			setCollectionPhotos([]);

		}

		unsplashFetch(`collections/${collection_id}/photos`)(`?page=${collection_page}&per_page=${ collection_page > 1 ? PHOTOS_TO_APPEND : INITIAL_PHOTOS_NUMBER}`).then( (photos) => {

			const fetched_photos = photos.map( (photo_info) => <CollectionMiniature collection_id={collection_id} photo_data={photo_info} key={`${collection_id}_${photo_info.id}`}/>)
			setCollectionPhotos( collection_photos.concat(fetched_photos) )
			setCollectionPage(collection_page + 1);

		}) 

		if ( collection_page === 2 ) {

			const preview_height = document.getElementById("infinite-collection-view").clientHeight;

			setInfiniteScrollHeight(preview_height);

			const enter_button = document.querySelector("#enter-button");
			const infinite_collection = document.querySelector('.infinite-scroll-component')

			infinite_collection.removeChild(enter_button);

			console_ref.current.insertCommand(`cd ./collections/${collection_id}/photos`)
		}

	}

	useEffect( () => { fetchCollectionPhotos(); console.log(collection_photos) }, [])

	return (
		<div className="collection_preview_wrapper">
			<CollectionDescription key={collection_id}/> 
			<InfiniteScroll
				id="infinite-collection"
				dataLength={collection_photos.length} 
				next={ () => { 
					fetchCollectionPhotos();
				}}
				hasMore={ 
					collection_photos.length === total_photos
				}
				scrollableTarget="infinite-collection-view"
				style={{
					display: 'flex',
					flexDirection: 'column',

					justifyContent: 'center',
					alignItems: 'center'
				}}>
				<section style={{

					width: `100%`,
					display: `flex`,
					flexWrap: `wrap`,

					height: `${infinite_scroll_height}px`,

					overflowY: 'scroll', 
					overflowX: 'none'

				}} id="infinite-collection-view">
					{collection_photos || "Loading..."}
				</section>	
				<button 
					onClick={ () => { fetchCollectionPhotos() } } 
					id="enter-button">
						ENTER COLLECTION
					</button>
			</InfiniteScroll>
		</div>
	);
}

export default CollectionPreview;
import './CollectionPreview.scss'
import { useEffect, useState, useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import styled from "styled-components"

import InfiniteScroll from 'react-infinite-scroll-component'

import { unsplashFetch } from '../../utils/unsplash_api';

import PhotoView from "../PhotoView"
import CollectionMiniature from '../../components/CollectionMiniature';
import CollectionDescription from '../../components/CollectionDescription';

import { MinSplashBrowserContext } from '../MinSplashBrowser';
import { useParams } from 'react-router-dom';

const INITIAL_PHOTOS_NUMBER = 12;
const PHOTOS_TO_APPEND = 30;

const button_hover_css = `

	transition: 0.25s ease-in-out;

	&:hover {

		transition: 0.25s ease-in-out;
		transform: translate(-2px, -2px);

	}

`;

const SortingWrapper = styled.div`

	position: relative;

	padding: 0.5rem;

	& > button {

		background: none;

		margin-left: 1rem;
		margin-right: 0.5rem;
		padding: 0.5rem;

		background-color: lighten($color: $space-cadet, $amount: 20);
		border: 3px dotted white;

		color: white;

		font-family: "Inconsolata";
		font-size: 90%;
		font-weight: 500;
		
		text-align: center;

		cursor: pointer;

		${button_hover_css}

	}

`

const CollectionPreviewWrapper = styled.div`

    display: flex;
	flex-direction: column;

`

const EnterButton = styled.button`

	width: 90%;

	margin-top: 1rem;

	background: none;

	cursor: pointer;

	color: white;

	font-family: "Inconsolata";
	font-size: 90%;
	font-weight: 500;
	
	text-align: center;

	margin-left: 5px;

	background-color: lighten($color: $space-cadet, $amount: 20);

	padding: 0.25rem;
	border: 3px dotted white;

	${button_hover_css}

`

function CollectionPreview() {

	const collection_id = useParams()["collectionId"]
	const current_context = useContext(MinSplashBrowserContext);

	const console_ref = current_context.console_ref;

	const [collection_photos, setCollectionPhotos] = useState([]);
	const [collection_page, setCollectionPage] = useState(1);

	const [infinite_scroll_height, setInfiniteScrollHeight] = useState();

	function fetchCollectionPhotos () {

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

	useEffect( () => { fetchCollectionPhotos(); }, [])

	const sortCollection = ( field ) => {

		const sorted_collection_photos = [...collection_photos].sort( ( photo_a, photo_b ) => {

			const photo_a_field = field === "created_at" ? new Date(photo_a.props.photo_data[field]).getTime() : photo_a.props.photo_data[field];
			const photo_b_field = field === "created_at" ? new Date(photo_b.props.photo_data[field]).getTime() : photo_b.props.photo_data[field];

			return photo_a_field - photo_b_field;

		})

		setCollectionPhotos(sorted_collection_photos);

	}

	return (
		<Router>
			<Switch>
				<Route exact path={`/${collection_id}`}>
					<CollectionPreviewWrapper>
						<CollectionDescription key={collection_id}/> 
						<SortingWrapper>
							<span>Sorting type: </span>
							<button onClick={ () => { sortCollection("likes") } }>By likes</button>
							<button onClick={ () => { sortCollection("created_at") } } style={{

								marginLeft: '5px'

							}}>By date</button>
						</SortingWrapper>
						<InfiniteScroll
							id="infinite-collection"
							dataLength={collection_photos.length} 
							next={ () => { 
								fetchCollectionPhotos();
							}}
							hasMore={ true }
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
							<EnterButton 
								onClick={ () => { fetchCollectionPhotos() } } 
								id="enter-button">
									ENTER COLLECTION
							</EnterButton>
						</InfiniteScroll>
					</CollectionPreviewWrapper>
				</Route>
				<Route path="/:collectionId/:photoId">
					<PhotoView console_ref={console_ref}/>
				</Route>
			</Switch>
		</Router>
	);
}

export default CollectionPreview;
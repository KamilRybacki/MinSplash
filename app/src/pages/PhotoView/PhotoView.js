import { Link } from 'react-router-dom';

import { useEffect, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components"

import {
	FacebookShareButton,
	FacebookIcon,
	PinterestShareButton,
	PinterestIcon,
	RedditShareButton,
	RedditIcon,
	TwitterShareButton,
	TwitterIcon,
	VKShareButton,
	VKIcon
} from "react-share";

import Terminal from '../Terminal'
import { unsplashFetch } from '../../utils/unsplash_api'

const PhotoViewContentWrapper = styled.article`

	display: grid;
	grid-template-areas: 
	" desc window "
	" menu window ";	

	padding: 1rem;

	grid-template-columns: 20rem auto;

`

const PhotoWindow = styled.section`

	grid-area: window;

	position: relative;

	display: flex;
	justify-content: center;
	align-items: center;

	margin-left: 1rem;

	& > a > img {

		height: 30rem;
		width: auto;

	}

` 

const PhotoMenu = styled.div`

	grid-area: menu;

	display: flex;

	flex-direction: column;

	justify-content: center;
	align-items: center;

	& > span {

		font-weight: bold;

		margin-bottom: 0.5rem;

	}

	& > div {

		display: flex;
		flex-direction: row;

		justify-content: space-between;

		width: 75%;

		& > button > svg {
			width: 75%;	
		}

	}

`

const PhotoDescription = styled.section`

	grid-area: desc;

	& > header {
		font-weight: bolder;
		margin-bottom: 2rem;
	}

	& > div {

		margin-bottom: 1rem;

		& > span {
			margin-right: 0.5rem;
			text-decoration: underline;
		}
	}

`

const ReturnButton = styled.button`

	margin-top: 2rem;

	background-color: transparent;
	border: 2px dotted white;
	padding: 0.5rem;

	color: white;

	font-family: "Inconsolata";
	font-size: 120%;
`;

const photoview_terminal_style = {

	position: 'fixed',

	height: "75%",

	zIndex: "999",

	left: `10%`,
	top: `15%`,

}

function PhotoView ({console_ref}) {

	const [photo_data, setCurrentPhotoData] = useState({});
	const [photo_link, setCurrentPhotoLink] = useState("")

	const collection_id = useParams()["collectionId"];
	const photo_id = useParams()["photoId"];

	useEffect( () => {

		console_ref.current.insertCommand(`show-image ./collections/${collection_id}/${photo_id}`)

		unsplashFetch(`photos/${photo_id}`)("").then( (current_photo_data) => {
			
			setCurrentPhotoData(current_photo_data);
			setCurrentPhotoLink(current_photo_data.urls.raw)

		});

		// document.querySelector("#PhotoPreview__wrapper").style.width = document.querySelector("#Browser__wrapper").clientWidth;

	}, [photo_id])
	
	return(
		<Terminal title="PhotoPreview" style={photoview_terminal_style}>
			<PhotoViewContentWrapper>
				<nav style={{
					display: "flex",
					flexDirection: "column",

					alignItems: "center",
					justifyContent: "center"
				}}>
					<PhotoDescription>
						<div>Description:</div>
						<header>{photo_data.description || photo_data.alt_description}</header>
						<div><span>Views:</span>{photo_data.views}</div>
						<div><span>Likes:</span>{photo_data.likes}</div>
					</PhotoDescription>
					<PhotoMenu>
						<span>Share this photo</span>
						<div>
							<FacebookShareButton url={photo_link}><FacebookIcon/></FacebookShareButton>
							<VKShareButton url={photo_link}><VKIcon/></VKShareButton>
							<TwitterShareButton url={photo_link}><TwitterIcon/></TwitterShareButton>
							<RedditShareButton url={photo_link}><RedditIcon/></RedditShareButton>
							<PinterestShareButton url={photo_link}><PinterestIcon/></PinterestShareButton>
						</div>
						<Link to={`/MinSplash/${collection_id}`}><ReturnButton>Return to collection</ReturnButton></Link>			
					</PhotoMenu>
				</nav>
				<PhotoWindow>
					{ photo_data.urls ? <a href={photo_data.urls.raw} target="_blank" ><img src={photo_data.urls.raw}/></a> : ""}
				</PhotoWindow>
			</PhotoViewContentWrapper>
		</Terminal>
	)
}

export default PhotoView;
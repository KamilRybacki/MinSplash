import { Link } from 'react-router-dom';

import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useMediaQuery } from "react-responsive";

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

import { unsplashFetch } from '../../utils/unsplash_api'

const button_hover_css = `

	transition: 0.25s ease-in-out;

	&:hover {

		transition: 0.25s ease-in-out;
		transform: translate(-2px, -2px);

	}

`;

const PhotoViewContentWrapper = styled.article`

	display: flex;
	flex-direction: column;

	padding: 1rem;

`

const PhotoDescription = styled.section`

	display: flex;
	justify-content: space-between;

	font-weight: 300;

	margin-bottom: 1rem;

	& > header {

		width: 100%;

		& > span {
			font-weight: 500;
		}

	}

	& > section {

		& > span {
			font-weight: 500;
		}

	}


`

const PhotoWindow = styled.section`

	grid-area: window;

	position: relative;

	display: flex;
	justify-content: center;
	align-items: center;

	margin-left: 1rem;

	& > img {

		max-width: 100%;
		border: 1px solid white;

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

	}

	& > header {

		display: flex;
		align-items: center;
		justify-content: center;

		& > span {

			margin-right: 1rem;

		}

		& > button {

			width: 2rem;
			margin-right: 5px;
			${button_hover_css}

			& > svg {
				width: 100%;
			}

		}

	}

	& > footer {

		display: flex;
		align-items: center;

	}

`
const DownloadButton = styled.a`

	justify-content: center;
	align-items: center;

	margin-left: 0.5rem;

	border: 2px dotted white;
	padding: 0.5rem;

	color: white;

	font-family: "Inconsolata";
	text-decoration: none;

	cursor: pointer;

	${button_hover_css}

`;

const ReturnButton = styled.button`

	display: flex;

	background-color: transparent;
	border: none;
	padding: 0.5rem;

	color: white;

	font-family: "Inconsolata";
	text-dectoration: none;

	cursor: pointer;

	${button_hover_css}

`;


function PhotoView ({console_ref}) {

	const [photo_data, setCurrentPhotoData] = useState({});
	const [photo_link, setCurrentPhotoLink] = useState("")

	const collection_id = useParams()["collectionId"];
	const photo_id = useParams()["photoId"];

	const isMobile = useMediaQuery({
		query: '(max-width: 450px)'
	})

	useEffect( () => {

		console_ref.current.insertCommand(`show-image ./collections/${collection_id}/${photo_id}`)

		unsplashFetch(`photos/${photo_id}`)("").then( (current_photo_data) => {
			
			setCurrentPhotoData(current_photo_data);
			setCurrentPhotoLink(current_photo_data.urls.raw)

		});

	}, [photo_id])
	
	return(
		<PhotoViewContentWrapper>
			<nav style={{
				display: "flex",
				flexDirection: "column",

				justifyContent: "center"
			}}>
				<PhotoDescription>
					<header>
						<span>Description:</span>
						<p>{photo_data.description || photo_data.alt_description}</p>
					</header>
					<section>
						<span>Views:</span>{photo_data.views}<br/>
						<span>Likes:</span>{photo_data.likes}
					</section>
				</PhotoDescription>
				<PhotoWindow>
					{ photo_data.urls ? <img src={photo_data.urls.raw}/> : "Loading..."}
				</PhotoWindow>
				<PhotoMenu>
					<header>
						<span>Share via:</span>
						<FacebookShareButton url={photo_link}><FacebookIcon/></FacebookShareButton>
						<VKShareButton url={photo_link}><VKIcon/></VKShareButton>
						<TwitterShareButton url={photo_link}><TwitterIcon/></TwitterShareButton>
						<RedditShareButton url={photo_link}><RedditIcon/></RedditShareButton>
						<PinterestShareButton url={photo_link}><PinterestIcon/></PinterestShareButton>
					</header>
					<footer>
						<Link to={`/${collection_id}`} style={{ textDecoration: 'none' }}><ReturnButton>Return to collection</ReturnButton></Link>
						<DownloadButton href={photo_link} download target="_blank">Download picture</DownloadButton>
					</footer>
				</PhotoMenu>
			</nav>
		</PhotoViewContentWrapper>
	)
}

export default PhotoView;
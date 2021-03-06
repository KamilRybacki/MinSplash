import styled from 'styled-components';

import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

const Miniature = styled.article`

	border: 5px solid #FFFFFF;

	position: relative;
	margin: 5px;
	border: 1px solid;
	box-sizing: border-box;
	
	&::before {
		content: '';
		display: block;
		padding-top: 100%;
	}

	#miniature_img {

		position: absolute;
		top: 0; left: 0;
		height: 100%;
		width: 100%;

	}

	transition: 0.25s ease-in-out;

	&:hover {

        transition: 0.25s ease-in-out;
		transform: translate3d(-2px, -2px, 0px);		

	}

`;

function CollectionMiniature ({photo_data, collection_id, children}){

	const [image_link, setImageLink] = useState("/");
	const isMobile = useMediaQuery({
		query: '(max-width: 450px)'
	})

	useEffect( () => {
		
		const photo_id = photo_data.id 

		setImageLink(`/${collection_id}/${photo_id}`);

	},[])	

	return (
		<Miniature className='collection_miniature' style={
			{ flexBasis: isMobile ? 'calc( 50% - 10px )' : 'calc( 25% - 10px )'} 	
		}>
			{photo_data.title ? <header><h2>{photo_data.title}</h2></header> : ""} 
			<Link to={image_link} id="miniature_link"><img src={photo_data.urls.thumb} alt="Miniature photo" id="miniature_img"/></Link>
			{children ?
			<div className="miniature_content">
				{children}
			</div> : ""}
		</Miniature>
	);
}

export default CollectionMiniature;
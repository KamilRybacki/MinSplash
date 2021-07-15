import styled from 'styled-components';

import { useContext } from 'react';

import { MinSplashBrowserContext } from '../../pages/MinSplashBrowser';

const DescInfo = styled.article`

	position: relative;

	display: flex;
	flex-direction: column;

	padding: 0.5rem;

	width: 50%;

	& > div {

		font-weight: 500;
		font-size: 90%;

		& > span {

			font-size: 90%;
			font-weight: 300;

		}

	} 

`

const DescWrapper = styled.section`

	display: flex;
	flex-direction: row;

	justify-content: space-between;

`

const DescriptionText = styled.span`

	position: relative;

	width: 50%;
	padding: 0.5rem;

	font-weight: 300;
	font-size: 80%;

	text-align: right;

`

const TitleSpan = styled.header`

	margin-bottom: 5px;

	text-decoration: underline;
	font-size: 125%;
`

function CollectionDescription() {

	const current_collection = useContext(MinSplashBrowserContext)["collection"];

	return (
		<DescWrapper>
			<DescInfo> 
				<TitleSpan>{current_collection.title || "" }</TitleSpan>
				<div>Author: <span>{current_collection.user.username || ""}</span></div>
				<div>Published at: <span>{current_collection.published_at || ""}</span></div>
				<div>No. photos: <span>{current_collection.total_photos || ""}</span></div>
			</DescInfo>
			{<DescriptionText>{current_collection.description || "No description"}</DescriptionText>}
		</DescWrapper>
	)
}

export default CollectionDescription;
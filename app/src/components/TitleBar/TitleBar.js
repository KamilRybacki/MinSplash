import styled from 'styled-components';
import { darken } from 'polished'

const TITLE_BAR_TEXT_COLOR = "#1d2951"
const TITLE_BAR_BG_COLOR = "#979aaa"

const TitleBarWrapper = styled.div`

	background: ${TITLE_BAR_BG_COLOR};
	box-shadow: inset 1px 1px 5px ${darken(0.1,TITLE_BAR_BG_COLOR)};

	display: flex;

	justify-content: space-between;
	align-items: center;

	padding: 0.25rem;
	padding-left: 1rem;
	padding-right: 1rem;

	border-top-left-radius: 0.5rem;
	border-top-right-radius: 0.5rem

`

const TitleBarButtonWrapper = styled.div`

	height: 100%;
	width: 50px;

	display: flex;
	justify-content: space-between;
	align-items: center;

	& > button {

		display: inline-block;
		padding: 0;

		height: 0.75rem;
		width: 0.75rem;

		background: none;
		border: none;
		border-radius: 50%;

	}

	button[id*="minimize"]{
		background-color: yellow;
	}	
	
	button[id*="maximize"]{
		background-color: green;
	}	

	button[id*="close"]{
		background-color: red;
	}

`

const TitleBarText = styled.span`

	font-family: "Inconsolata";
	font-weight: bold;
	font-size: smaller;

	color: ${TITLE_BAR_TEXT_COLOR}; 
	
	width: 100%;
	text-align: center;
`

function TitleBar ({title}) {

	const wrapper_title = `${title}__bar-wrapper`

	return (
		<TitleBarWrapper>
			<TitleBarButtonWrapper>
				<button id={`${wrapper_title}_close`}></button>
				<button id={`${wrapper_title}_minimize`}></button>
				<button id={`${wrapper_title}_maximize`}></button>
			</TitleBarButtonWrapper>
			<TitleBarText>{title}</TitleBarText>
		</TitleBarWrapper>
	)	
}

export default TitleBar;
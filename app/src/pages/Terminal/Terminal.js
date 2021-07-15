import { useEffect } from 'react';
import TitleBar from '../../components/TitleBar'

import styled from 'styled-components';

const TerminalWrapper = styled.div`

	margin-top: 1rem;
	margin-left: 0.5rem;
	margin-right: 0.5rem;

    max-width: 75rem

`;

const TerminalBrowserWindow = styled.div`

	display: block;
	overflow: auto;

	font-family: 'Inconsolata';
	font-weight: bolder;
	font-size: 1rem;

	padding: 0.25rem;
	padding-left: 1rem;
	padding-right: 1rem;

`

function Terminal ({title, children}) {

	useEffect( () => {

		var link = document.createElement('link');
		link.setAttribute('rel', 'stylesheet');
		link.setAttribute('type', 'text/css');
		link.setAttribute('href', 'https://fonts.googleapis.com/css2?family=Inconsolata:wght@200;300;500;600&display=swap');
		document.head.appendChild(link)

	}, [])

	return(
		<TerminalWrapper id={`${title}__wrapper`}> 
			<TitleBar title={title} id={`${title}__title-bar`}/>
			<TerminalBrowserWindow id={`${title}__window`}>
				{children}
			</TerminalBrowserWindow>
		</TerminalWrapper>
	)
}

export default Terminal;
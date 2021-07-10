import './style.scss'

function TitleBar ({title}) {

	const wrapper_title = `${title}__bar-wrapper`

	return (
		<div id={wrapper_title} className="title-bar-wrapper">
			<div id={`${wrapper_title}_button-wrapper`} className="title-bar-button-wrapper">
				<button id={`${wrapper_title}_close`} className="title-bar-close title-bar-button"></button>
				<button id={`${wrapper_title}_minimize`} className="title-bar-minimize title-bar-button"></button>
				<button id={`${wrapper_title}_maximize`} className="title-bar-maximize title-bar-button"></button>
			</div>
			<span id={`${wrapper_title}_text`} className="title-bar-text">{title}</span>
		</div>
	)	
}

export default TitleBar;
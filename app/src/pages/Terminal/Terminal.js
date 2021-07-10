import TitleBar from '../../components/TitleBar'
import './style.scss'

function Terminal ({title, children}) {

	return(
		<div id={`${title}__wrapper`} className="terminal-wrapper"> 
			<TitleBar title={title} id={`${title}__title-bar`}/>
			<section id={`${title}__window`} className="terminal-window">
				{children}
			</section>
		</div>
	)
}

export default Terminal;
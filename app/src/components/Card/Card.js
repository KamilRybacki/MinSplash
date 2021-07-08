import './Card.css'

function Card ({title, src, alt, children}){

	return (
		<article className='card'>
			<header>
				<h2>{title}</h2>
			</header>    
			<img src={src} alt={alt}/>
			<div className="card_content">
				{children}
			</div>
		</article>
	);
}

export default Card;
import './Cards.css'

function Cards(props) {

	let card_id = "cards_panel"
	if (props.id) card_id = props.id

	return (
		<div className="cards" id={card_id}>
			{props.children}
		</div>	
	);
}

export default Cards;
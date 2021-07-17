import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const CLOSED_FOLDER_SRC = "/images/category_closed.svg"
const OPEN_FOLDER_SRC = "/images/category_open.svg"

const DEFAULT_ICON_PROPS = {
	
	alt: "folder_icon",
	className: "list_entry_icon" 

}

function ListEntry({collection_id, collection_title, ...rest}) {

	const currently_selected_id = useLocation().pathname.slice(1);

	const [pressed, setPressed] = useState(false);

	useEffect( () => {

		if( currently_selected_id ){
			if (collection_id !== currently_selected_id){
				setPressed(false);
			}
		}

	}, [currently_selected_id] )

	return(
		<>
			<Link to={ !pressed ? `/MinSplash/${collection_id}` : "/" } className="list_entry_link" onClick={ () => { setPressed(!pressed) } }>
				<img {...DEFAULT_ICON_PROPS} src={ pressed ? OPEN_FOLDER_SRC : CLOSED_FOLDER_SRC } />
				{collection_title}
			</Link  >
		</>
	)
}

export default ListEntry;
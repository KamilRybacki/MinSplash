import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import CLOSED_FOLDER_SRC from "../../assets/images/category_closed.svg"
import OPEN_FOLDER_SRC from "../../assets/images/category_open.svg"

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
			<Link to={ !pressed ? `/${collection_id}` : "/" } className="list_entry_link" onClick={ () => { setPressed(!pressed) } }>
				<img {...DEFAULT_ICON_PROPS} src={ pressed ? OPEN_FOLDER_SRC : CLOSED_FOLDER_SRC } />
				{collection_title}
			</Link  >
		</>
	)
}

export default ListEntry;
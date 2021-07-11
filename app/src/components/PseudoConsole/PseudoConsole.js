import { Component } from "react";

import './style.scss'

const WELCOME_MSG = "CLI initialized!";
const MAX_HISTORY = 5;

class PseudoConsole extends Component {

	constructor(props) {

		super(props)
		this.state = {
			history: [WELCOME_MSG],
			console_id: props.id	
		}

	}

	componentDidMount () {
		this.setState({
			text_field: document.getElementById(`${this.state.console_id}__input`)
		})
	}

	pushToHistory = (command) => {
		
		if (command) {

			let current_history = [...this.state.history]

			if (command === "clear"){
				current_history = []
			}
			else {

				if (current_history.length === MAX_HISTORY) {
					current_history.shift()
				}

				current_history.push(command)

			}

			const current_text_field = this.state.text_field;
			current_text_field.value = ""

			this.setState({
				history: [...current_history], 
				text_field: current_text_field
			})
		}
	}

	insertCommand = (command) => { this.pushToHistory(command) }

	render(){
		return (
			<div id={this.state.console_id} className="terminal">
				<span id={`${this.state.console_id}__output`}>{
					this.state.history.map( (command, index) => {
						return <p key={`terminal_output_${index + 1}`}>{command}</p>
					}) 
				}</span>	
				<section><p>></p><input type="text" id={`${this.state.console_id}__input`} onKeyDown={ (e) => e.key === "Enter" ? this.pushToHistory(this.state.text_field.value) : {} } autoComplete="off"/></section>
			</div>
		)
	}
}

export default PseudoConsole;
import React from 'react'
import { Consumer } from '../store'
import { Button } from '@material-ui/core'

export default function CreateIdea() {
	return (
		<Consumer>
			{({ createIdea }) => 
				<Button onClick={createIdea} variant="contained">Add</Button>
			}
		</Consumer>
	)
}
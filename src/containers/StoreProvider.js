import React, { useState, useEffect } from 'react'
import { useSnackbar } from 'notistack'

import { defaultStore, Provider } from '../store'
import { GET_IDEA, GET_IDEAS, DELETE_IDEA, UPDATE_IDEA } from '../api'

export default function StoreProvider({ children }) {
	const [ideas, setIdeas] = useState(defaultStore.ideas)
	const [activeIdea, setActiveIdea] = useState({})
	const { enqueueSnackbar } = useSnackbar()

	useEffect(() => {
		(async function getIdeas() {
			const { data } = await GET_IDEAS()
			setIdeas(data)
		})()
	}, [])

	const createIdea = async () => {
		const { data } = await GET_IDEA()
		setActiveIdea(data.newIdea)
		enqueueSnackbar('New Idea created', { variant: 'success' })
		setIdeas(data.ideas)
	}

	const deleteIdea = async id => {
		const { data } = await DELETE_IDEA(id)
		enqueueSnackbar(`Idea ${id} deleted`, { variant: 'warning' })
		setIdeas(data)
	}

	const updateIdea = async idea => {
		const { data } = await UPDATE_IDEA(idea)
		enqueueSnackbar(`Idea ${idea.id} updated`, { variant: 'success' })
		setIdeas(data)
	}

	const state = {
		ideas,
		createIdea,
		deleteIdea,
		activeIdea,
		setActiveIdea,
		updateIdea
	}

	return (
		<Provider value={state}>
			{ children }
		</Provider>
	)
}


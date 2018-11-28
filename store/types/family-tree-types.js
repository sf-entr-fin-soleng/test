const familyTree = {
	prefix: 'familyTree',

	mutation: {
		FETCH_TREE_SUCCESS: 'fetchSuccess',
		WRITE_TREE_SUCCESS: 'writeSuccess',
		WRITE_NODE_START: 'writeNodeStart',
		ASSIGN_PROSPECTS: 'assignProspects'
	},

	action: {
		FETCH_TREE: 'fetchTree',
		WRITE_TREE: 'writeTree',
		WRITE_NODE: 'writeNode',
		ASSIGN_PROSPECTS: 'assignProspects'
	}
}

export default familyTree

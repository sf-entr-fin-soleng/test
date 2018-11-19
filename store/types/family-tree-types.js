const familyTree = {
	prefix: 'familyTree',

	mutation: {
		FETCH_TREE_SUCCESS: 'fetchSuccess',
		WRITE_TREE_SUCCESS: 'writeSuccess',
		WRITE_NODE_START: 'writeNodeStart'
	},

	action: {
		FETCH_TREE: 'fetchTree',
		WRITE_TREE: 'writeTree',
		WRITE_NODE: 'writeNode'
	}
}

export default familyTree

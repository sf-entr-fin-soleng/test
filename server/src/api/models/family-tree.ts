const familyTree = {
	self: {
		firstName: undefined,
		lastName: undefined,
		age: undefined,
		email: undefined,
		notes: undefined,

		parents: [],
		children: [],
		family: [],
		externals: []
	},

	partner: {
		firstName: undefined,
		lastName: undefined,
		age: undefined,
		email: undefined,
		notes: undefined,

		parents: [],
		children: [],
		family: [],
		externals: [],

		relationship: {
			type: 'partner',
			label: 'Partner - Not Specified',
			gender: 'Other'
		}
	},

	both: {
		firstName: undefined,
		lastName: undefined,
		age: undefined,
		email: undefined,
		notes: undefined,

		children: [],
		externals: []
	}
}

export default familyTree

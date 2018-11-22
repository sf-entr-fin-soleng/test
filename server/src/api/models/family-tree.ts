// const familyTree = {
// 	self: {
// 		firstName: '',
// 		lastName: '',
// 		age: 0,
// 		birthdate: '',
// 		phone: '',
// 		email: '',
// 		notes: '',

// 		children: [
// 			{ firstName: 'OSM-Child', children: [{ firstName: 'Grandchild' }] }
// 		],
// 		parents: [{ firstName: 'Mom', relationship: 'Mother' }],

// 		family: [
// 			{ firstName: 'Aunt', relationship: 'Aunt' },
// 			{ firstName: 'Harriet', relationship: 'Cousin' }
// 		],
// 		externals: [{ firstName: 'Pat', relationship: 'Business Partner' }]
// 	},

// 	both: {
// 		children: [
// 			{ firstName: 'Child', children: [{ firstName: 'Grandchild' }] }
// 		],
// 		externals: [{ firstName: 'Josh', relationship: 'Accountant' }]
// 	},

// 	partner: {
// 		firstName: 'Partner',
// 		lastName: 'Node',
// 		parents: [{ firstName: 'Dad' }],
// 		family: [{ firstName: 'Uncle', relationship: 'Uncle' }],
// 		children: [
// 			{ firstName: 'OSM-Child', children: [{ firstName: 'Grandchild' }] }
// 		],

// 		externals: [{ firstName: 'Bob', relationship: 'Lawyer' }]
// 	}
// }

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

	// partner: {
	// 	firstName: undefined,
	// 	lastName: undefined,
	// 	age: undefined,
	// 	email: undefined,
	// 	notes: undefined,
	// 	benefitiary: undefined,
	// 	birthdate: undefined,

	// 	parents: [],
	// 	children: [],
	// 	family: [],
	// 	externals: []
	// },

	// both: {
	// 	children: [],
	// 	externals: []
	// }
}

export default familyTree

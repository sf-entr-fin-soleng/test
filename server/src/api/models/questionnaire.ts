// const questionnaire = {
// 	questions: {
// 		'question-1': {
// 			required: true,
// 			title: 'Question 01',
// 			type: 'multiple',
// 			options: ['Option 01', 'Option 02', 'Option 03']
// 		},

// 		'question-2': {
// 			required: true,
// 			title: 'Question 02',
// 			type: 'single',
// 			options: ['Option 01', 'Option 02', 'Option 03']
// 		},

// 		'question-3': {
// 			required: true,
// 			title: 'Question 03',
// 			type: 'textarea'
// 		},

// 		'question-4': {
// 			required: false,
// 			title: 'Question 04',
// 			type: 'single',
// 			options: ['Yes', 'No']
// 		}
// 	},

// 	sections: {
// 		'section-01': {
// 			title: 'Section 01',
// 			questions: ['question-01', 'question-02']
// 		},

// 		'section-02': {
// 			title: 'Section 02',
// 			questions: ['question-03']
// 		},

// 		'section-03': {
// 			title: 'Section 03',
// 			questions: ['question-04']
// 		}
// 	},

// 	dependencies: {
// 		'section-02': {
// 			dependsOn: 'question-03',
// 			answer: '2'
// 		}
// 	}
// }

const questionnaire = {
	questions: {},
	sections: {},
	dependencies: {}
}

export default questionnaire

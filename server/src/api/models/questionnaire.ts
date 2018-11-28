const questionnaire = {
	title: '10 Questions',
	sections: [
		{
			id: 'a090i000000076NNXB',
			triggerOnAnswer: null,
			skippable: false,
			required: true,
			title: 'Your current Investment situation',
			dependsOnQuestion: null,
			questions: [
				{
					id: '090i000000076PQM0',
					title: 'Do you have a',
					type: 'multiple',
					options: [
						'RRSP',
						'RRIF',
						'TFSA',
						'Mortgage',
						'Line of Credit'
					]
				},
				{
					id: '090i000000076PQM1',
					title: 'When are you planning to retire?',
					type: 'number',
					options: []
				},
				{
					id: '090i000000076PQM2',
					title: 'Do you have a detailed financial plan?',
					type: 'boolean',
					options: ['Yes', 'No']
				}
			],
			previousSection: null,
			nextSection: 'a090i000000076NNXA'
		},
		{
			id: 'a090i000000076NNXA',
			triggerOnAnswer: null,
			skippable: false,
			required: true,
			title: 'About your business',
			dependsOnQuestion: null,
			questions: [
				{
					id: '090i000000076PQN0',
					title: 'Do you own a business?',
					type: 'boolean',
					options: ['Yes', 'No']
				}
			],
			previousSection: 'a090i000000076NNXB',
			nextSection: 'a090i000000076NNXZ'
		},
		{
			id: 'a090i000000076NNXZ',
			triggerOnAnswer: 'Yes',
			skippable: false,
			required: true,
			title: "About your business (cont'd)",
			dependsOnQuestion: '090i000000076PQN0',
			questions: [
				{
					id: '090i000000076PQZ0',
					title: 'Is there a shareholder agreement?',
					type: 'boolean',
					options: ['Yes', 'No']
				},
				{
					id: '090i000000076PQZ1',
					title: 'What is/are your role(s)?',
					type: 'multiple',
					options: [
						'CEO',
						'President',
						'Marketing',
						'Operations',
						'Sales',
						'Technology'
					]
				},
				{
					id: '090i000000076PQZ2',
					title: 'Describe your business situation',
					type: 'note',
					options: []
				},
				{
					id: '090i000000076PQZ3',
					title:
						'How does your personal insurance compare with your corporate entity in regard to death/illness?',
					type: 'note',
					options: []
				},
				{
					id: '090i000000076PQZ3',
					title: 'What is the corporate structure or legal entity?',
					type: 'single',
					options: [
						'Sole Proprietorship',
						'Partnership',
						'Corporation',
						'Co-operative'
					]
				}
			],
			previousSection: 'a090i000000076NNXA',
			nextSection: 'a090i000000076NNXW'
		},
		{
			id: 'a090i000000076NNXW',
			triggerOnAnswer: null,
			skippable: false,
			required: true,
			title: 'Your Insurance Situation',
			dependsOnQuestion: null,
			questions: [
				{
					id: '090i000000076PQW0',
					title: 'What types of insurance do you currently have?',
					type: 'multiple',
					options: [
						'Home',
						'Mortgage',
						'Life',
						'Critical Illness',
						'Disability'
					]
				},
				{
					id: '090i000000076PQW1',
					title: 'Who makes the important decisions?',
					type: 'multiple',
					options: [
						'I do',
						'My Spouse',
						'My Accountant',
						'My Lawyer',
						'My Financial Advisor'
					]
				}
			],
			previousSection: 'a090i000000076NNXZ',
			nextSection: 'a090i000000076NNXU'
		},
		{
			id: 'a090i000000076NNXU',
			triggerOnAnswer: null,
			skippable: false,
			required: true,
			title: 'Your Estate plan',
			dependsOnQuestion: null,
			questions: [
				{
					id: '090i000000076PQU0',
					title: 'What is your current estate plan?',
					type: 'note',
					options: []
				},
				{
					id: '090i000000076PQU1',
					title: 'To whom and why',
					type: 'note',
					options: []
				},
				{
					id: '090i000000076PQU2',
					title: 'Do you currently have a',
					type: 'multiple',
					options: ['POA', 'Will']
				}
			],
			previousSection: 'a090i000000076NNXW',
			nextSection: 'a090i000000076NNXT'
		},
		{
			id: 'a090i000000076NNXT',
			triggerOnAnswer: null,
			skippable: false,
			required: true,
			title: 'What keeps you up at night?',
			dependsOnQuestion: null,
			questions: [
				{
					id: '090i000000076PQT0',
					title: '',
					type: 'note',
					options: []
				}
			],
			previousSection: 'a090i000000076NNXU',
			nextSection: null
		}
	]
}

export default questionnaire

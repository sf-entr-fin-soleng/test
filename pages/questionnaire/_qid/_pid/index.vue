<template>
	<section class="questionnaire">
		<Header title="Questionnaire"/>

		<!-- <pre v-if="debug">{{ questions }} </pre> -->
		<div class="slds-grid slds-wrap slds-grid_align-center slds-size_1-of-1">
			<div 
				v-for="key in currentSection.questions"
				:key="key"
				class="question-container">
				<div class="question-title">{{ questions[key].title }}</div>

				<div v-if="questions[key].options">
					<div 
						v-for="option in questions[key].options"
						:key="option.key"
						class="question-input">
						<input  
							:id="`${key}-${option.key}`"
							:value="option"
							v-model="questions[key].answer"
							:type="questions[key].type === 'multiple' ? 'checkbox' : 'radio'"
						>
						<label 
							:for="`${key}-${option.key}`"> {{ option }} </label>
					</div>
				</div>

				<div v-if="questions[key].type === 'textarea'">
					<input  
						:id="`${key}-${questions[key].type}`"
						v-model="questions[key].answer"
						type="textarea"
					>
					<label 
						:for="`${key}-${questions[key].type}`">Response: </label>
				</div>

				<div v-if="questions[key].type === 'number'">
					<input  
						:id="`${key}-${questions[key].type}`"
						v-model="questions[key].answer"
						:min="questions[key].min"
						:max="questions[key].max"
						type="number"
					>
					<label 
						:for="`${key}-${questions[key].type}`">Response: </label>
				</div>
			</div>
		</div>

		<NavBar 
			@click-next="parseForm($event, true)" 
			@click-prev="parseForm($event, false)"/>
	</section>
</template>

<script>
import Header from '~/components/Header.vue'
import NavBar from '~/components/NavBar.vue'
import Form from '~/components/Form.vue'
import FormField from '~/components/FormField.vue'

export default {
	components: {
		Header,
		NavBar,
		Form,
		FormField
	},

	async asyncData({ app, store, params }) {
		const actions = {
			fetchQuestionnaire: 'questionnaire/fetchQuestionnaire',
			fetchAnswers: 'questionnaire/fetchAnswers',
			fetchProspect: 'prospect/fetchProspect'
		}

		await store.dispatch(actions.fetchProspect, params.pid)
		await store.dispatch(actions.fetchQuestionnaire, params.qid)
		await store.dispatch(actions.fetchAnswers, {
			qid: params.qid,
			pid: params.pid
		})
	},

	data: function() {
		const { qid, pid } = { ...this.$route.params }

		// Ensure that user only interacts with this
		// page when both questionnaire and prospect
		// ids are defined and passed from the route
		if (!qid || !pid) {
			this.$router.push('/')
		}

		// Local copy of our questions object
		const questions = JSON.parse(
			JSON.stringify(
				this.$store.state.questionnaire.questionnaire.questions
			)
		)

		// Local copy of our answers object
		const answers = JSON.parse(
			JSON.stringify(this.$store.state.questionnaire.answers)
		)

		return {
			questions,
			answers,
			debug: true
		}
	},

	computed: {
		currentSection: function() {
			// Fetch current section based on the
			// server response. If no section id is
			// defined, use fallback id (first section)
			const state = this.$store.state.questionnaire
			const sectionId = state.answers.currentSectionId
				? state.answers.currentSectionId
				: Object.keys(state.questionnaire.sections)[0]

			const section = state.questionnaire.sections[sectionId]
			return { ...section, sectionId }
		},

		dependencies: function() {
			return this.$store.state.questionnaire.questionnaire.dependencies
		}
	},

	methods: {
		parseForm: async function(event, isNext) {
			const answers = JSON.parse(
				JSON.stringify(this.$store.state.questionnaire.answers)
			)

			answers.questionnaireId = this.$route.params.qid
			answers.prospectId = this.$store.state.prospect.prospect.id
			answers.currentSectionId = this.currentSection.sectionId
			answers.responses = {}

			for (let key in this.questions) {
				const question = this.questions[key]
				answers.responses[key] = question.answer
			}

			console.log('isNext', isNext)
			await this.$store.dispatch('questionnaire/writeAnswers', {
				answers,
				isNext
			})
		}
	}
}
</script>

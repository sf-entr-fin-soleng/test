<template>
	<section class="questionnaire">
		<Header title="Questionnaire"/>

		<div class="slds-grid slds-wrap slds-grid_align-center slds-size_1-of-1">
			<div class="cQuestionnaire_Inquiry slds-grid slds-wrap slds-size_9-of-12 slds-grid_align-center slds-gutters igforms-utils__max-width--large">
				<questionnaire-input 
					v-for="key in currentSection.questions" 
					:key="key"
					:inputs="questions[key].options"
					:title="questions[key].title"
				/>
			</div>
		</div>
	</section>
</template>

<script>
import Header from '~/components/Header.vue'
import QuestionnaireInput from '~/components/modules/questionnaire/QuestionnaireInput.vue'
export default {
	components: {
		Header,
		QuestionnaireInput
	},

	async asyncData({ app, store, params }) {
		const questionnaire = await store.dispatch(
			'questionnaire/fetchQuestionnaire',
			params.qid
		)

		const responses = await store.dispatch('questionnaire/fetchAnswers', {
			qid: params.qid,
			pid: params.pid
		})
	},

	data: function() {
		const { qid, pid } = { ...this.$route.params }

		if (!qid || !pid) {
			this.$router.push('/')
		}

		return {}
	},

	computed: {
		currentSection: function() {
			// Fetch current section based on the
			// server response. If no section id is
			// defined, use fallback id (first section)
			const questionnaire = this.$store.state.questionnaire
			const sectionId = questionnaire.answers.currentSection
			const section = questionnaire.questionnaire.sections[sectionId]

			const fallback = Object.keys(
				questionnaire.questionnaire.sections
			)[0]

			return section
				? section
				: questionnaire.questionnaire.sections[fallback]
		},

		questions: function() {
			return this.$store.state.questionnaire.questionnaire.questions
		},

		dependencies: function() {
			return this.$store.state.questionnaire.questionnaire.dependencies
		}
	}
}
</script>

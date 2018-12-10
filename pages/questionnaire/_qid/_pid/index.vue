<template>
	<section class="questionnaire">
		<Header title="Questionnaire"/>
		<client-header/>

		<section-title 
			:section-title="currentSection.title" 
			:show-skip="true"
			@skip="parseForm($event, true)"/>
		<div class="slds-grid slds-wrap slds-grid_align-center slds-size_1-of-1 igforms-questionnaire-container">
			<div class="slds-grid slds-wrap slds-size_9-of-12 slds-grid_align-center slds-gutters igforms-utils__max-width--large">
				<div 
					v-for="key in currentSection.questions"
					:key="key"
					:class="['cQuestionnaire_Inquiry slds-col', questions[key].renderLarge || (questions[key].options && questions[key].options.length > 2) || (questions[key].type === 'textarea') ? 'slds-size_1-of-1' : 'slds-size_1-of-2', 'cQuestionBoolean']">

					<!-- <pre>{{ questions[key] }}</pre> -->
					<fieldset class="slds-form-element">
						<legend class="slds-col slds-form-element__legend slds-form-element__label slds-p-vertical_small">{{ questions[key].title }}</legend>
						<div 
							v-if="questions[key].options" 
							class="slds-form-element__control">

							<div class="slds-form-element__row slds-size_1-of-1 slds-checkbox_button-group slds-m-top_small">
								<span 
									v-for="option in questions[key].options"
									:key="option.key"
									:class="['slds-col slds-button slds-checkbox_button', questions[key].options.length > 2 ? 'slds-size_1-of-3' : 'slds-size_1-of-2']">
									<input  
										:id="`${key}-${option.key}`"
										:value="option"
										v-model="questions[key].answer"
										:type="questions[key].type === 'multiple' ? 'checkbox' : 'radio'"
									>
									<label 
										:for="`${key}-${option.key}`"
										class="slds-checkbox_button__label slds-align_absolute-center"> 
										<span class="slds-checkbox_faux">{{ option.label }}</span>
									</label>
								</span>
							</div>
							
						</div>

						<div 
							v-if="questions[key].type === 'textarea'" 
							class="textarea-input slds-col slds-size_1-of-1">
							<fieldset>
								<div class="slds-form-element">
									<div class="slds-form-element__control">
										<textarea 
											:id="`${key}-${questions[key].type}`"
											v-model="questions[key].answer"
											class="slds-textarea textarea" 
											placeholder="Add notes..."/>
									</div>
								</div>
							</fieldset>
						</div>

						<div 
							v-if="questions[key].type === 'number'"
							class="slds-form-element__control">

							<div class="slds-m-top_small cQuestionnaire_NumberInput">
								at
								<input  
									:id="`${key}-${questions[key].type}`"
									v-model="questions[key].answer"
									:min="questions[key].min"
									:max="questions[key].max"
									type="number"
									class="igforms-utils__text-align--center"
								>
							</div>
						</div>
					</fieldset>
				</div>
			</div>

			<NavBar 
				@click-next="parseForm($event, true)" 
				@click-prev="parseForm($event, false)"/>
	</div></section>
</template>

<script>
import Header from '~/components/Header.vue'
import ClientHeader from '~/components/ClientHeader.vue'
import NavBar from '~/components/NavBar.vue'
import SectionTitle from '~/components/SectionTitle.vue'

export default {
	components: {
		Header,
		ClientHeader,
		NavBar,
		SectionTitle
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

		return {
			actions
		}
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

			// Save answers back to the server
			await this.$store.dispatch('questionnaire/writeAnswers', {
				answers,
				isNext
			})

			// TODO: use nextModule as isNext in order to
			// either proceed back to dashboard or go back to
			// our goals and concerns module
			const nextModule = this.$store.state.questionnaire.answers.moveOn
			if (nextModule !== undefined)
				this.$router.push(
					`/dashboard/${this.$store.state.prospect.prospect.id}`
				)
		}
	}
}
</script>

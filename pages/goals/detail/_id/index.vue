<template>
	<section class="cPage_GoalDetails">
		<Header title="Goal Details"/>

		<div v-if="debug">
			<pre>GOAL: {{ goal }}</pre><br>
			<pre>DETAIL: {{ detail }}</pre>
		</div>

		<div class="cPage_GoalDetails_form-header">
			Key Details
		</div>

		<!-- Hero-->
		<div class="igforms-hero-banner slds-col slds-size_12-of-12">
			<img 
				:src="'/images/goals-concerns/hero/' + goal.image + '.jpg'" 
				alt="header image"
			>
			<div class="igforms-hero-banner__header-background">
				<p>{{ goal.name }}</p>
			</div>
		</div>

		<!-- Form  -->
		<div class="slds-grid slds-col slds-grid_align-center slds-size_1-of-1">
			<Form 
				id="detail-form" 
				@form-submit="saveDetail">
				<div class="slds-col slds-size_10-of-12 slds-form slds-form_compound igforms-utils__max-width--large">
					<fieldset class="slds-form-element">
						<div class="slds-form-element__group slds-p-horizontal_large slds-m-vertical_small">
							<div class="slds-form-element__row">
								<div class="slds-col slds-size_10-of-12">
									<FormField 
										v-model="detail.description"
										:maxlength="255"
										:required="true"
										label="Why is this important to you?"
										root-type="textarea"/>
								</div>
							</div>
							<div class="slds-form-element__row">
								<div class="slds-col slds-size_1-of-2">
									<FormField 
										:filter="$options.filters.currency"
										v-model="detail.amount"
										:update-on-key-up="false"
										:required="true"
										label="How much are you willing to spend on this goal?"
										type="text"/>
								</div>
							</div>
							<div class="slds-form-element__row">
								<div class="slds-col slds-size_1-of-2">
									<form-field 
										v-model="detail.timeframe"
										:required="true"
										:min="0"
										:max="25"
										:step="5"
										:custom-validation="validateTimeframe"
										root-type="slider"
										label="When do you want to achieve this goal?"
									>
										<span 
											slot="sliderValue"
											class="slds-slider__value" 
											aria-hidden="true">{{ detail.timeframe >= 25 ? '25+' : detail.timeframe }}&nbsp;years</span>
									</form-field>
								</div>
							</div>
						</div>
					</fieldset>
				</div>
			</Form>
		</div>

		<!-- NavBar -->
		<NavBar 
			@click-next="$root.$emit('trigger-submit', { formId: 'detail-form' })" 
			@click-prev="$router.go(-1)"/>
	</section>
</template>

<script>
import Form from '~/components/Form.vue'
import FormField from '~/components/FormField.vue'
import Header from '~/components/Header.vue'
import NavBar from '~/components/NavBar.vue'

export default {
	components: {
		Form,
		FormField,
		Header,
		NavBar
	},
	props: {
		debug: { type: Boolean, default: true }
	},
	data: function() {
		const { priority, detailIndex } = { ...this.$route.params }
		const tray = this.$store.state.goal.trays[priority]
		const detail = tray ? Object.assign({}, tray.details[detailIndex]) : {}
		const goal = detail.goalId
			? this.$store.state.goal.goals[detail.goalId]
			: {}

		return {
			detail,
			goal,
			priority,
			detailIndex
		}
	},

	mounted: function() {
		// Go back to the home page if either priority
		// or the detail index are invalid
		if (!this.priority || this.detailIndex === undefined) {
			this.$router.push('/')
			return
		}
	},

	methods: {
		saveDetail: async function() {
			try {
				this.detail.valid = true
				this.$store.dispatch('goal/saveDetail', {
					priority: this.priority,
					index: this.detailIndex,
					detail: this.detail
				})
				await this.$store.dispatch('goal/writeDetails')
				this.$router.go(-1)
			} catch (err) {
				console.error(err)
			}
		},

		validateTimeframe: function(target) {
			if (target.value <= 0) throw 'Time-frame needs to be greater than 0'
		}
	}
}
</script>

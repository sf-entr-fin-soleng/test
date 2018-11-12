<template>
	<div class="igforms-priority slds-col slds-size_12-of-12">
		<pre v-if="debug">{{ goals }}</pre>
		<div
			class="igforms-utils__position--relative slds-grid slds-wrap slds-size_1-of-1 slds-grid_align-center">
			<p 
				v-if="name" 
				class="igforms-priority__medium-title">{{ name }}</p>
			<div class="slds-grid slds-size_1-of-1 igforms-utils__max-width--large">
				<p class="igforms-priority__high-title-big igforms-utils__max-width--large">{{ priority.toUpperCase() }}</p>
				<div class="igforms-priority__drop-area--placeholder"/>
				<draggable 
					:id="priority"
					v-model="goals"
					:options="{ group: { name: priority, put: accept }}" 
					class="draggable igforms-priority__drop-area slds-m-vertical_x-large slds-align_absolute-center slds-col slds-gutters slds-size_1-of-1 igforms-utils__max-width--large slds-p-around_small" 
					@add="handleAdd"
					@start="drag=true"
					@end="drag=false">
					<div 
						v-for="goal in goals" 
						:key="goal.id" 
						class="igforms-priority__card igforms-priority__card--high slds-p-around-xxx-small slds-col slds-medium-size_2-of-12 slds-small-size_4-of-12">
						<div v-if="true">
							Checkmark
						</div>
						<a href="/">
							<img 
								src="~assets/images/IG_Wealth_Management_RGB.svg" 
								alternativeText="IG Wealth Management logo"
							>
							<span>
								<p class="igforms-priority__card--title">
									{{ goal.name }}
								</p>
							</span>
						</a>
					</div>
				</draggable>
			</div>
		</div>
	</div>
</template>

<script>
import Draggable from 'vuedraggable'
export default {
	components: {
		Draggable
	},
	props: {
		name: { type: String, default: undefined },
		priority: { type: String, default: 'none' },
		// accept: { type: Array, default: () => ['none'] },
		debug: { type: Boolean, default: true }
	},
	computed: {
		accept: function() {
			return this.$store.state.goal.goals[this.priority].accept
		},
		goals: {
			get() {
				return this.$store.state.goal.goals[this.priority].elements
			},

			set(value) {
				this.$store.commit('goal/updateElement', {
					priority: this.priority,
					elements: value
				})
			}
		}
	},
	methods: {
		handleAdd(event, what) {
			// Dispatch store action only on add event
			const payload = {
				prospectId: this.$store.state.prospect.prospect.id,
				to: event.to.id
			}

			this.$store.dispatch('goal/writeDetails', payload)
		}
	}
}
</script>

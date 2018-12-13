<template>
	<section>
		<pre v-if="debug">{{ details }}</pre>
		<div
			class="igforms-utils__position--relative slds-grid slds-wrap slds-size_1-of-1 slds-grid_align-center">
			<p 
				v-if="name" 
				class="igforms-priority__high-title">{{ name }}</p>
			<div class="slds-grid slds-size_1-of-1 igforms-utils__max-width--large">
				<p class="igforms-priority__high-title-big igforms-utils__max-width--large">{{ priority.toUpperCase() }}</p>
				<draggable 
					:id="priority"
					v-model="details"
					:options="{ group: { name: priority, put: accept }}" 
					class="draggable igforms-priority__drop-area slds-m-vertical_x-large slds-align_absolute-center slds-col slds-gutters slds-size_1-of-1 igforms-utils__max-width--large" 
					@start="drag=true"
					@end="drag=false">
					<div 
						v-for="(detail,index) in details"
						v-if="detail !== undefined" 
						:key="detail.goalId" 
						class="igforms-priority__card igforms-priority__card--high slds-p-around-xxx-small slds-col slds-medium-size_2-of-12 slds-small-size_4-of-12"
						@click="click($event, index)">
						<div
							v-if="detail.valid"
							class="igforms-tile-checkmark slds-icon_container_circle slds-icon-action-approval slds-icon_container cCenteredCheckIcon">
							<span
								class="slds-icon_container slds-icon-action-approval"
								title="Approved">
								<svg
									class="slds-icon slds-icon-text-default"
									aria-hidden="true">
									<use xlink:href="/images/icons/action-sprite/svg/symbols.svg#approval" />
								</svg>
								<span
									class="slds-assistive-text">Approved</span>
							</span>
						</div>
						<div 
						>
							<img 
								:src="'/images/goals-concerns/cards/' + goals[detail.goalId].image + '.png'" 
								alternativeText="IG Wealth Management logo"
							>
							<span>
								<p class="igforms-priority__card--title">
									{{ goals[detail.goalId].name }}
								</p>
							</span>
						</div>
					</div>
				</draggable>
			</div>
		</div>
	</section>
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
		debug: { type: Boolean, default: false }
	},
	computed: {
		accept: function() {
			return this.$store.state.goal.trays[this.priority].accept
		},
		goals: function() {
			return this.$store.state.goal.goals
		},
		details: {
			get() {
				return this.$store.state.goal.trays[this.priority].details
			},

			set(value) {
				this.$store.commit('goal/updateDetails', {
					priority: this.priority,
					details: value
				})
			}
		}
	},
	methods: {
		click: function(event, index) {
			const params = {
				priority: this.priority,
				detailIndex: index
			}

			this.$router.push({
				name: 'goals-detail-id',
				params: { ...params }
			})
		}
	}
}
</script>

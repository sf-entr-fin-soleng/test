<template>
	<div class="igforms-footer__container slds-grid slds-gutters slds-col slds-size_12-of-12 slds-p-vertical_medium">
		<div class="slds-grid slds-col slds-size_1-of-1 slds-grid_align-center">
			<div class="slds-clearfix slds-col slds-size_1-of-1 igforms-utils__max-width--large">
				<div 
					v-if="displayBackButton" 
					class="igforms-footer__back-button slds-float_left">
					<button 
						class="slds-button"
						@click="$emit('click-prev', $event)">
						<i class="slds-button__icon slds-button__icon_left material-icons">
							navigate_before
						</i>
						{{ backLabel }}
					</button>
				</div>

				<div class="igforms-footer__next-button slds-float_right">

					<!-- @antonio.cordeiro
					Actions are just really extra buttons
					coming from the original InVision design  -->
					<div 
						v-if="displayActions" 
						class="igforms-footer__family-tree__actions">
						<a 
							v-for="(action, index) in actions" 
							:key="index"
							@click="action.go">
							{{ action.label }}
						</a>
					</div>

					<button 
						v-if="displayNextButton" 
						class="slds-button"
						@click="$emit('click-next', $event)">
						{{ nextLabel }}
						<i class="slds-button__icon slds-button__icon_right material-icons">
							navigate_next
						</i>
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	// @antonio.cordeiro
	// Huge level of boolean controls are
	// needed because the navbar functionality
	// is the same in every page but the way
	// it's displayed isn't.
	props: {
		displayNextButton: {
			type: Boolean,
			default: true
		},
		displayBackButton: {
			type: Boolean,
			default: true
		},
		displayActions: {
			type: Boolean,
			default: true
		},
		displayBackIcon: {
			type: Boolean,
			default: true
		},
		displayNextIcon: {
			type: Boolean,
			default: true
		},
		backLabel: {
			type: String,
			default: 'Back'
		},
		nextLabel: {
			type: String,
			default: 'Next'
		},
		actions: {
			type: Array,
			default: () => []
		}
	},
	data: function() {
		return {}
	}
}
</script>

<template>
	<div 
		v-if="render" 
		class="igforms_modal">
		<div class="igforms_modal-wrapper">
			<!-- <lightning:buttonIcon iconName="utility:close" variant="bare" onclick="{!c.OnCancel}" alternativeText="close"
                    class="igforms_modal-close" /> -->

			<p class="igforms_modal-title">
				{{ title }}
			</p>
			<div class="igforms_modal-underline"/>
			<!-- <img src="{!$Resource.formspatternlib + '/formspatternlib/images/icons/confirmation-checkmark-wb-icon.svg'}"
                    alternativeText="plus" class="slds-p-right_xx-small" /> -->
			<!-- <p>{!v.toastMessage}</p> -->

			<div class="igforms_modal-message">
				<slot/>
			</div>

			<div class="igforms_modal-button-wrapper">
				<!-- <lightning:button label="Cancel" title="cancel action" onclick="{!c.OnCancel}" />
                    <lightning:button label="{!v.confirmLabel}" title="send action" onclick="{!c.OnConfirm}" variant="brand" /> -->
				<button 
					class="slds-button" 
					@click="cancel">Cancel</button>
				<button 
					class="slds-button slds-button_brand" 
					@click="confirm">Confirm</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		title: { type: String, default: 'Just confirming...' }
	},
	data: function() {
		return { render: false }
	},
	methods: {
		show: function() {
			this.render = true
		},
		hide: function() {
			this.render = false
		},
		cancel: function(event) {
			this.hide()
			this.$emit('cancel', event)
		},
		confirm: function(event) {
			this.hide()
			this.$emit('confirm', event)
		}
	}
}
</script>

<template>
	<!-- Body -->
	<div class="search_tabs igforms-link__print slds-col slds-size_12-of-12">
		<div class="slds-grid slds-grid_align-center slds-wrap slds-p-top_small">
			<div class="slds-medium-size_11-of-12 igforms-utils__max-width--large">
				<fieldset class="slds-form-element">
					<legend class="slds-form-element__legend slds-form-element__label"/>
					<div class="slds-form-element__control">
						<div class="slds-radio_button-group">
							<span class="slds-button slds-radio_button">
								<input 
									id="prospect" 
									type="radio" 
									name="radio" 
									value="prospect"
									checked >
								<label 
									class="slds-radio_button__label" 
									for="prospect">
									<span class="slds-radio_faux">Prospects</span>
								</label>
							</span>
							<span class="slds-button slds-radio_button">
								<input 
									id="client" 
									type="radio" 
									name="radio" 
									value="client" >
								<label 
									class="slds-radio_button__label" 
									for="client">
									<span class="slds-radio_faux">Clients</span>
								</label>
							</span>
						</div>
					</div>
				</fieldset>
			</div>
		</div>
		<div class="slds-grid slds-grid_align-center slds-wrap slds-p-top_large searchbar">
			<div class="slds-col slds-medium-size_11-of-12 igforms-utils__max-width--large">
				<div class="slds-form-element">
					<label 
						class="slds-form-element__label" 
						for="form-element-01"/>
					{{ searchTerm }}
					<div class="slds-form-element__control">
						<input 
							id="form-element-01" 
							v-model="searchTerm" 
							type="text" 
							class="slds-input"
							placeholder="Enter Client Search Here"
							@blur="$emit('search-updated', $event.target.value)"
							@keyup.enter.prevent="$emit('search-updated', $event.target.value)"
							@keyup.backspace.prevent="$event.target.value ? '' : $emit('search-updated', $event.target.value)">
						<button 
							class="slds-button slds-button_icon igforms-search-button"
						>
							<i class="material-icons">
								search
							</i>
						</button>
						
					</div>
				</div>
			</div>
		</div>
	</div>
    
</template>

<script>
export default {
	data: function() {
		return {
			searchTerm: ''
		}
	},

	methods: {
		// @antonio.cordeiro
		// This could be a generic component that handles
		// a list of entities but for now it's just a dumb
		// component that simply handles input events
		searchTermUpdated(event, term) {
			this.$emit('search-updated', term)
		}
	}
}
</script>

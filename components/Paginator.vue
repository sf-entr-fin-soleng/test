<template>
	<!-- Body markup -->
	<div 
		v-if="recordCount > 0" 
		class="igforms-paginator igforms-link__print slds-grid slds-grid_align-center">
		<div class="slds-wrap slds-col slds-size_12-of-12 slds-grid_align-center">
			<div>
				<button 
					class="slds-button slds-button_icon"
					@click="clickPrevious"><i class="slds-button__icon material-icons">
						navigate_before
					</i>
				</button>

				<button 
					v-for="n in totalPages"
					:key="`key-${n}`" 
					:class="['slds-button', n == currentPage ? 'active' : '']"
					@click="clickPage(n)">{{ n }}</button>
				<button 
					class="slds-button slds-button_icon"
					@click="clickNext"><i class="slds-button__icon material-icons">
						navigate_next
					</i>
				</button>
			</div>
		</div>
	</div>
</template>

<script>
import { clamp } from 'lodash'

export default {
	props: {
		perPage: {
			type: Number,
			default: 5
		},
		recordCount: {
			type: Number,
			default: 50
		}
	},

	data: function() {
		return { currentPage: 1 }
	},

	computed: {
		totalPages: function() {
			return Math.ceil(this.recordCount / this.perPage)
		}
	},

	watch: {
		totalPages: function() {
			this.currentPage = 1
		}
	},

	methods: {
		clickPage: function(pageNumber) {
			this.currentPage = pageNumber
			this.$emit(
				'page-change',
				this.currentPage,
				this.totalPages,
				this.perPage
			)
		},

		clickNext: function() {
			this.clickPage(clamp(++this.currentPage, 1, this.totalPages))
		},

		clickPrevious: function() {
			this.clickPage(clamp(--this.currentPage, 1, this.totalPages))
		}
	}
}
</script>

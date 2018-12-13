<template>
	<nav 
		class="igforms-header igforms-link__print slds-col slds-grid slds-size_12-of-12 slds-grid_align-center slds-p-vertical_medium" 
		role="banner">
		<div class="slds-grid slds-size_1-of-1 igforms-utils__max-width--large">
			<div class="slds-col slds-medium-size_8-of-12 slds-clearfix">
				<div class="igforms-header__iglogo slds-float_left">
					<nuxt-link to="/">
						<img 
							src="~assets/images/IG_Wealth_Management_RGB.svg" 
							alternativeText="IG Wealth Management logo"
						>
					</nuxt-link>
				</div>
				<div class="igforms-header__igpagename slds-float_left">
					<h1 class="">{{ title }}</h1>
				</div>
			</div>
			<div class="igforms-header__menu slds-col slds-medium-size_4-of-12 slds-clearfix">
				<ul class="slds-float_right">
					<li class="slds-p-left_xx-large">
						<nuxt-link to="/">
							<span>
								<img 
									src="~assets/images/Home.svg" 
									alternativeText="home icon" 
									class="home">
							</span>
							Home
						</nuxt-link>
					</li>
					<li class="slds-p-left_xx-large">
						<a href="#">
							<span>
								<img 
									:src="$store.state.user.user.profileThumbnailUrl"
									style="border-radius: 50%; max-height: 20px; width: auto" 
									alternativeText="user icon" >
							</span>
							{{ $store.state.user.user.firstName }}
						</a>
					</li>
				</ul>
			</div>
		</div>
	</nav>
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			default: 'High Touch'
		}
	}
}
</script>

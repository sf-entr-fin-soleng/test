<template>
	<section class="page-login">
		<div class="header">
			<img 
				class="logo" 
				src="~/assets/images/IG_Wealth_Management_RGB.svg">
			<h1>DC&ES High Touch Digital Forms</h1>
		</div>
		<div class="content">
			<div 
				class="sf-login" 
				role="button"
				@click="$router.push('/')">
				<h2>Login with Salesforce</h2>
			</div>
		</div>
	</section>
</template>

<style lang="scss">
.page-login {
	background-color: #fbfbfb;
	height: calc(100vh);
	overflow-y: hidden;

	.header {
		box-sizing: border-box;
		max-width: 100%;
		padding: 10px;
		background-color: white;

		.logo {
			border-right: 1px solid #1e254b;
		}

		h1 {
			text-align: center;
			font-size: 1.5rem;
			line-height: normal;
			display: inline;
			vertical-align: middle;
			padding: 20px;
		}

		img {
			max-width: 100%;
			box-sizing: border-box;
			max-height: 75px;
			padding: 10px;
			margin: 20px auto;
			display: inline-block;
		}

		@media (max-width: 425px) {
			padding: 10px;

			.logo {
				border-bottom: 1px solid #1e254b;
				border-right: none;
			}

			h1 {
				font-size: 1rem;
				padding: 5px;
				display: block;
			}

			img {
				max-width: 320px;
				display: block;
			}
		}
	}
	.content {
		box-sizing: border-box;
		margin: calc((100vh * 0.5) - 135px) auto;
		padding: 20px;
		max-width: 420px;

		.sf-login {
			cursor: pointer;
			background-color: rgb(20, 157, 248);
			margin: 20px auto;
			padding: 10px;
			text-align: center;

			h2 {
				font-size: 1rem;
				color: white;
			}
		}

		.sf-login:hover {
			background-color: rgb(142, 210, 255);
		}

		@media (max-width: 425px) {
			max-width: 280px;
			margin: calc((100vh * 0.5) - 167px) auto;
		}
	}
}
</style>

<script>
export default {
	data: function() {
		return {}
	}
}
</script>

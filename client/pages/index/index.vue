<template>
	<view class="content">
		<view class="option">
			<button @click="handleLogin">登录</button>
			<view style="width: 20px;">
			</view>
			<button @click="handleRegister">注册</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {
			// const token = uni.getStorageSync('token');
			// if (token) {
			// 	uni.reLaunch({
			// 		url: "/pages/home/home"
			// 	})
			// }
		},
		methods: {
			handleLogin() {
				uni.navigateTo({
					url: "/pages/login/login"
				})
			},
			handleRegister() {
				uni.navigateTo({
					url: "/pages/register/register"
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.content {
		height: 100%;

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-end;


		.option {
			display: flex;
			margin-bottom: 20px;
		}
	}
</style>

<template>
	<view>

	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';

	export default {
		data() {
			return {

			}
		},
		computed: {
			...mapState({
				socket: (state) => state.user.socket
			}),
		},
		async onLoad() {
			let email = uni.getStorageSync("email")
			if (email) {
				await this.$store.dispatch('connectSocket', email);
			}
			this.socket.setSuccessListener(this.onSuccess)
			this.socket.setMessageListener(this.onMessage)
		},
		async onUnload() {
			await this.$store.dispatch('disconnectSocket');
		},
		methods: {
			onSuccess(res) {
				console.log("连接成功");
			},
			onError(err) {
				console.log("连接失败");
			},
			onMessage(res) {
				uni.showToast({
					title: res,
					duration: 2000,
					icon: "success"
				});
			},
		}
	}
</script>

<style>

</style>

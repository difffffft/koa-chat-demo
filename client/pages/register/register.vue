<template>
	<view class="register">
		<view class="model">
			<text class="title">账号</text>
			<input type="text" placeholder="请输入邮箱" v-model.trim="userEmail">
		</view>
		<view class="model">
			<text class="title">密码</text>
			<input type="password" placeholder="请输入密码" v-model.trim="password">
		</view>
		<view class="model">
			<text class="title">再次输入密码</text>
			<input type="password" placeholder="请再次输入密码" v-model.trim="lastPassword">
		</view>
		<button type="primary" @click="handleRegister">注册</button>
	</view>
</template>

<script>
	import {
		reqRegister
	} from "@/api"
	export default {
		data() {
			return {
				userEmail: "",
				password: "",
				lastPassword: ""
			}
		},
		methods: {
			handleRegister() {
				if (this.userEmail === "") {
					uni.showToast({
						title: '邮箱不能为空',
						duration: 2000,
						icon: "error"
					});
					return
				}
				const emailRegExp = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
				if (!emailRegExp.test(this.userEmail)) {
					uni.showToast({
						title: '请输入正确的邮箱格式',
						duration: 2000,
						icon: "error"
					});
					return
				}
				if (this.password === "") {
					uni.showToast({
						title: '密码不能为空',
						duration: 2000,
						icon: "error"
					});
					return
				}
				if (this.lastPassword !== this.password) {
					uni.showToast({
						title: '请输入一致的密码',
						duration: 2000,
						icon: "error"
					});
					return
				}
				reqRegister({
					userEmail: this.userEmail,
					password: this.password
				}).then((res) => {
					res = res[1].data
					uni.showToast({
						title: res.msg,
						duration: 2000,
						icon: res.code ? "success" : "error"
					})
					if (res.code) {
						setTimeout(()=>{
							uni.navigateBack({delta:1})
						},2000)
					}
				}).catch((err) => {
					uni.showToast({
						title: err,
						duration: 2000,
						icon: "error"
					});
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.register {
		padding: 20px;

		.model {
			margin: 20px 0;

			.title {
				font-size: 18px;
				font-weight: 900;
			}

			input {
				height: 48px;
				border: 1px solid #666666;
				border-radius: 4px;
				padding-left: 24px;
			}
		}
	}
</style>

//快速创建一个sokcet长连接

class Socket {
	//基本属性
	//
	url = null
	socketTask = null
	//重连定时器
	rconnectTimer = null

	constructor(url) {
		this.url = url
		this.connect(this.url)
	}

	//连接
	connect = (url) => {
		this.socketTask = uni.connectSocket({
			url,
			complete: (data) => {}
		});
	}

	setSuccessListener = (fun) => {
		this.socketTask.onOpen((res) => {
			this.clearTimer()
			if (fun) {
				fun(res)
			}
		})
	}
	setMessageListener = (fun) => {
		this.socketTask.onMessage((res) => {
			if (fun) {
				fun(res.data)
			}
		});
	}

	onError = (fun) => {
		this.socketTask.onError((err) => {
			this.rconnect()
			if (fun) {
				fun(err)
			}
		})
	}

	onClose = (fun) => {
		this.socketTask.onClose((err) => {
			if (fun) {
				fun(err)
			}
		})
	}



	//清除所有定时器
	clearTimer = () => {
		clearInterval(this.rconnectTimer)
		this.rconnectTimer = null
	}

	//销毁方法
	onDestroy = () => {
		this.clearTimer()
		//关闭连接
		this.socketTask.close();
		//释放资源
		this.socketTask = null
	}

	close = () => {
		this.clearTimer()
		this.socketTask.close();
		this.socketTask = null
	}

	sendMsg = (obj) => {
		try {
			this.socketTask.send({
				data: obj
			});
		} catch (e) {
			//重新连接
			this.rconnect()
			//重新发送
			// sendMsg(jsonObj)
		}
	}

	rconnect = (msgFun) => {
		//手动关闭
		this.onDestroy()
		//每隔5秒重新连接
		this.rconnectTimer = setInterval(() => {
			console.log("重新连接中...");
			this.connect(this.url)
		}, 1000 * 5)
	}




}

export default Socket

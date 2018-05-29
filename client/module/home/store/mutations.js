export const updateUser = (state,param) => {
	if(!param){
		// session中用户信息未失效
		if(!!sessionStorage.getItem('user_message')){
			state.userMes = JSON.parse(sessionStorage.getItem('user_message'));
			state.userStatus = true;
		}
	}else{
		// 登陆接口返回用户信息
		state.userMes = param;
		state.userStatus = true;
	}
}

export const updateUserStatus = (state,param) => {
	state.userStatus = false;
}

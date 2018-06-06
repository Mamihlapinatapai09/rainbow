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
	state.userMes={
		name:'未',
		teamNum:0,
		activityNum:0,	
	}
	state.userStatus = false;
}

export const updateActivityNum = (state,param) => {
	state.userMes.activityNum += 1;
	sessionStorage.setItem('user_message',JSON.stringify(state.userMes));
}

export const updateTeamNum = (state,param) => {
	state.userMes.teamNum += 1;
	sessionStorage.setItem('user_message',JSON.stringify(state.userMes));
}
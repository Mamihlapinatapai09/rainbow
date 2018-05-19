export const updateTest = (state,param) => {
	state['test'] = param;
}

export const updateUser = (state,param) => {
	if(!param){
		if(!!sessionStorage.getItem('user_message')){
			state.userMes = JSON.parse(sessionStorage.getItem('user_message'));
		}
	}else{
		state.userMes = param;
	}
}

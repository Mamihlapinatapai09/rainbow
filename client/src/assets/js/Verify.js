export default {
	// 手机的验证规则
    validateMobile(rule, value, callback){
        if(value === ''){
            callback()
            return
        }
        if(!/^1[3-9][0-9]\d{8}$/.test(value)){
            callback(new Error("请输入正确手机号！"));
            return;
        }
        callback();
    },
}
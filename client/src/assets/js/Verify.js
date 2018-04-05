const trim = (value) => {
    var value = value === undefined ? '' : value;
    if(typeof value !== 'string') {
        return value
    }
    return value.replace(/(^\s*)|(\s*$)/g,"");
}
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

    //邮箱
    validateEmail(rule,value,callback){
        var value = trim(value);
        if(value === ''){
            callback()
            return
        }
        if(value != "" && !/^[a-zA-Z0-9!#$%&\'*+\\/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&\'*+\\/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/.test(value)){
            callback(new Error("请输入正确邮箱！"));
            return;
        }
        callback();
    },
    //身份证号
    validateIdCode(rule,value,callback){
        var value = trim(value);
        if(value === ''){
            callback()
            return
        }
        let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; 
        if(value != "" && !reg.test(value)){
            callback(new Error("请输入正确身份证号！"));
            return;
        }
        callback();
    }
}
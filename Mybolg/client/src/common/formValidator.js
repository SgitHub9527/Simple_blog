//   验证用户名  用户名要求 数字、字母、下划线的组合，其中数字和字母必须同时存在*
const isvalidAccount = (rule, value) => {
        //校验规则
        const reg = /^(?![^A-Za-z]+$)(?![^0-9]+$)[0-9A-Za-z_]{4,15}$/;
        const regTest = reg.test(value)

        if (!value) {
            return new Error("请输入账号")
        } else if (!regTest) {
            return new Error("账号长度在 3 到 12 个字符");
        }
        return true
    }
    //密码验证
const isvalidPassword = (rule, value) => {
    const reg = /^[a-zA-Z]\w{7,18}$/;
    const regTest = reg.test(value);
    if (!value) {
        return new Error("请输入密码")
    } else if (!regTest) {
        return new Error("密码长度在 8 到 18 个字符");
    }
    return true
}
export {
    isvalidAccount,
    isvalidPassword
}
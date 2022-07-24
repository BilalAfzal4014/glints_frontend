import toastr from "toastr";

export default function validator(payLoad, rules) {
    let isSuccess = true;
    for (const rule of rules) {
        if (rule.regularExpression) {
            if (!matchRegularExpressionWithString(rule.regularExpression, payLoad[rule.name])) {
                isSuccess = false;
                toastr.error(rule.errorMessage);
            }
        }
        if (rule.minLength && (payLoad[rule.name].length < rule.minLength)) {
            isSuccess = false;
            toastr.error(`${rule.name} should be at least ${rule.minLength} character(s) long`);
        }
        if (rule.maxLength && (payLoad[rule.name].length > rule.maxLength)) {
            isSuccess = false;
            toastr.error(`${rule.name} should not be ${rule.maxLength} character(s) long`);
        }
    }
    return isSuccess;
}

const matchRegularExpressionWithString = (regularExpression, string) => {
    let regEx = new RegExp(regularExpression);
    return string.match(regEx);
}
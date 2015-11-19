/**
 * Created by EkaterinaAcc on 07-Nov-15.
 */
exports.sqlSettings = {

    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'adspace'

};
exports.port = 8080;
exports.tables_names = {
    users : 'users_adspace',
    company: 'company'
};
exports.messages = {
    company_login_failed : "Login failed. Email does not exists",
    login_success: "Login Sucess",
    login_failed_wrong_pwd: "Login Failed, wrong password",
    login_failed_internal_error: "Login Failed, intearnal error!",
    reg_success:"Registration Sucess",
    reg_failed: "Registration failed",
    reg_failed_wrong_email_format: "Registration Failed, wrong email format"
};
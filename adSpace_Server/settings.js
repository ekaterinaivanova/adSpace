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
    company: 'company',
    offers: 'offers',
    user_offers: 'user_offers'

};
exports.messages = {
    company_login_failed : "Login failed. Email does not exists",
    login_success: "Login Sucess",
    login_failed_wrong_pwd: "Login Failed, wrong password",
    login_failed_internal_error: "Login Failed, intearnal error!",
    reg_success:"Registration Sucess",
    reg_failed: "Registration failed",
    reg_failed_wrong_email_format: "Registration Failed, wrong email format",
    company_add_success: "Offer was added successfully!",
    company_already_exists: "Company Already exists!",
    user_already_exists: "User Already exists!",

    company_update_success: "Company was updated successfully!",
    company_update_failed:"Company update wasn't  successful!",
    company_update_access_failed:"Company update wasn't  successful! You are not allowed to update the  account",
    error: "An error has occurred!",
    update_offer_failed: "We couldn't update the offer. It doesn't exists or you don't have access to it!",
    wrongDates:"Start date > finisg date"
};
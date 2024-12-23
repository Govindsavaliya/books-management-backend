const UserModel = require("../models/user.model");
const { HttpStatus } = require("../utils/httpStatusCode");
const { ResponseMessage } = require("../utils/responseMessage");

exports.registerUserAction = async (req, res) => {
    try {
        const { firstName, lastName, email, password, confirmPassword } = req.body;

        const existingUserData = await UserModel.findOne({ email });
        if (existingUserData) {
            return res.status(HttpStatus.CONFLICT).json({
                message: ResponseMessage.email_already_associate_with_another_account,
                status: HttpStatus.CONFLICT,
                success: false,
                data: {},
            });
        }

        if (password == confirmPassword) {
            const newUserDetails = new UserModel({
                firstName,
                lastName,
                email,
                password,
            })

            await newUserDetails.save();

            return res.status(HttpStatus.CREATED).json({
                message: ResponseMessage.user_registered_successfully,
                status: HttpStatus.CREATED,
                success: true,
                data: {
                    _id: newUserDetails._id
                },
            });

        } else {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: ResponseMessage.password_and_confirm_password_not_match,
                status: HttpStatus.BAD_REQUEST,
                success: false,
                data: {},
            });
        }

    } catch (error) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: error.message,
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            success: false,
            data: {},
        });
    }
}

exports.loginUserAction = async (req, res) => {
    try {
        const { email, password } = req.body;

        const checkUserData = await UserModel.findOne({ email: email });
        if (!checkUserData) {
            return res.status(HttpStatus.NOT_FOUND).json({
                message: ResponseMessage.email_id_is_not_exist,
                status: HttpStatus.NOT_FOUND,
                success: false,
                data: {},
            });
        }

        const isMatch = await checkUserData.comparePassword(password);

        if (!isMatch) {
            return res.status(HttpStatus.UNAUTHORIZED).json({
                message: ResponseMessage.please_try_to_correct_credentials,
                status: HttpStatus.UNAUTHORIZED,
                success: false,
                data: {},
            });
        }

        const token = await checkUserData.generateAuthToken();

        return res.status(HttpStatus.OK).json({
            message: ResponseMessage.login_successfully,
            status: HttpStatus.OK,
            success: true,
            data: {
                _id: checkUserData._id,
                token: token,
            },
        });

    } catch (error) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: error.message,
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            success: false,
            data: {},
        });
    }
}

exports.getUserInfoAction = async (req, res) => {
    try {
        const id = req.user;
        const checkUserData = await UserModel.findOne({ _id: id });
        if (!checkUserData) {
            return res.status(HttpStatus.UNAUTHORIZED).json({
                message: ResponseMessage.please_try_to_correct_credentials,
                status: HttpStatus.UNAUTHORIZED,
                success: false,
                data: {},
            });
        }

        return res.status(HttpStatus.OK).json({
            message: ResponseMessage.get_login_user_info_successfully,
            status: HttpStatus.OK,
            success: true,
            data: checkUserData,
        });

    } catch (error) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: error.message,
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            success: false,
            data: {},
        });
    }
}
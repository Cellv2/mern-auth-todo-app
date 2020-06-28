import validator from "validator";

type RegistrationData = {
    username: string;
    email: string;
    passwordOne: string;
    passwordTwo: string;
};

type RegistrationErrors = {
    username?: string;
    email?: string;
    password?: string;
};

export type ValidateRegistration = {
    errors: RegistrationErrors;
    isValid: boolean;
};

const validateRegistration = (data: RegistrationData): ValidateRegistration => {
    let errors: RegistrationErrors = {};

    data.username = data.username ?? "";
    data.email = data.email ?? "";
    data.passwordOne = data.passwordOne ?? "";
    data.passwordTwo = data.passwordTwo ?? "";

    // name checks
    if (!data.username.length) {
        errors.username = "Please enter a name";
    }

    // email checks
    if (!data.email.length) {
        errors.email = "Please enter an email";
    } else if (!validator.isEmail(data.email)) {
        errors.email = "Please enter a valid email";
    }

    // password checks
    if (!data.passwordOne.length || !data.passwordTwo.length) {
        errors.password = "Please enter a password into both fields";
    } else if (!validator.equals(data.passwordOne, data.passwordTwo)) {
        errors.password =
            "Please ensure that both passwords match and try again";
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0 && typeof errors === "object",
    };
};

export default validateRegistration;

const validationRules = {
    firstName: {
        required: "First name is required",
        minLength: {
            value: 2,
            message: "First name must be at least 2 characters"
        }
    },
    lastName: {
        required: "Last name is required",
        minLength: {
            value: 2,
            message: "Last name must be at least 2 characters"
        }
    },
    email: {
        required: "Email is required",
        pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: "Invalid email address"
        }
    },
    password: {
        required: "Password is required",
        minLength: {
            value: 6,
            message: "Password must be at least 6 characters"
        }
    },
    confirmPassword: {
        required: "Confirm password is required",
        validate: (value: string, password: string) =>
            value === password || "Passwords do not match"
    }
};

export default validationRules;
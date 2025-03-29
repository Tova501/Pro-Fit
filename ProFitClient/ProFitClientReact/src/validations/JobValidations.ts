const validationRules = {
    title: {
        required: { value: true, message: "Title is required" }
    },
    description: {
        required: { value: true, message: "Description is required" }
    },
    company: {
    },
    requirements: {
        required: { value: true, message: "Requirements are required" }
    },
    skills: {
        required: { value: true, message: "Skills are required" }
    },
    yearsOfExperienceRequired: {
        required: { value: true, message: "Years of experience is required" },
        validate: {
            positive: (value: number) => value >= 0 || "Years of experience must be positive",
            max: (value: number) => value <= 45 || "Maximum allowed years of experience is 45"
        }
    },
    location: {
        required: { value: true, message: "Location is required" }
    }
};
export default validationRules;

import Joi from "joi";

export const PostValidation = Joi.object({
    title: Joi.string()
        .min(3)
        .max(150)
        .required(),
    content: Joi.string()
        .min(5)
        .required(),
    image: Joi.string()
        .uri()
        .optional()
});

export const commentValidation = Joi.object({
    content: Joi.string()
        .min(1)
        .max(500)
        .required(),
    postId: Joi.string()
        .required()
});
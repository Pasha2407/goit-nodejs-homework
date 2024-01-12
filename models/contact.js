const mongoose = require("mongoose");
const Joi = require("joi");

const contactJoiSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.number().required(),
    favorite: Joi.boolean(),
});

const favoriteJoiSchema = Joi.object({
    favorite: Joi.boolean().required(),
});

const contactSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Set name for contact'],
        },
        email: {
            type: String,
        },
        phone: {
            type: String,
        },
        favorite: {
            type: Boolean,
            default: false,
        },
    },
    { versionKey: false }
);

const contactModel = mongoose.model('Contact', contactSchema);

module.exports = {
    contactModel,
    contactJoiSchema,
    favoriteJoiSchema,
}



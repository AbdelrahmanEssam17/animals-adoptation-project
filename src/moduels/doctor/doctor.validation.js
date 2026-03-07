import Joi from "joi";

// Create doctor validation
export const createDoctor = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  specialization: Joi.string().min(3).max(50).required(),
  contactInfo: Joi.object({
   email:Joi.string().email({tlds:{allow:['com','net']},minDomainSegments:2,maxDomainSegments:3}).required(),
    phone: Joi.string().min(10).max(15).required()
  }).required(),
  availability: Joi.string().min(3).max(100).required(),
  location: Joi.string().min(3).max(100).required(),
  price: Joi.number().positive().optional(),
  image: Joi.string().uri().optional()
});


// export const updateDoctor = Joi.object({
//   name: Joi.string().min(3).max(50).optional(),
//   specialization: Joi.string().min(3).max(50).optional(),
//   contactInfo: Joi.object({
//     email: Joi.string().email().optional(),
//     phone: Joi.string().min(10).max(15).optional()
//   }).optional(),
//   availability: Joi.string().min(3).max(100).optional(),
//   location: Joi.string().min(3).max(100).optional(),
//   price: Joi.number().positive().optional(),
//   image: Joi.string().uri().optional()
// });
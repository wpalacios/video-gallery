import * as Joi from 'joi';

export const createVideoSchema = Joi.object({
  name: Joi.string().required(),
  url: Joi.string().required(),
});

export interface CreateVideoDTO {
  name: string;
  url: string;
}

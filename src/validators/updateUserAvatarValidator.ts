import { celebrate, Joi, Segments } from 'celebrate';

export default () => celebrate({
  [Segments.BODY]: Joi.object({
    avatar: Joi.string().required()
        .regex(/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/), // eslint-disable-line
  }),
});

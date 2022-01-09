import Joi from 'joi';

export default function getSchema(schemaRef, partials) {
  let schema;

  switch (schemaRef) {

    case 'club':
      schema = Joi.object({
        image: Joi.string().uri().required(),
        title: Joi.string().trim().required(),
        chip: Joi.string().trim().required(),
        description: Joi.string().trim().required(),
        clubCreated: Joi.date().allow(''),
        president: Joi.string().trim().required(),
        email: Joi.string().trim().email({ tlds: { allow: false } }).required(),
        links: Joi.array().items(Joi.object({
          source: Joi.string().trim().required(),
          url: Joi.string().trim().uri().allow(''),
        })),
      });
      break;

    case 'rule':
      schema = Joi.object({
        url: Joi.string().uri().required(),
        version: Joi.string().trim().required(),
        description: Joi.string().trim(),
      });
      break;

    case 'official-doc':
      schema = Joi.object({
        url: Joi.string().uri().required(),
        version: Joi.string().trim().required(),
        description: Joi.string().trim(),
      });
      break;

    default:
      schema = Joi.any();
      break;
  }

  if (partials) {
    // Return the specific key of the schema based on the value of partials
    console.log('plop');
    console.log(schema.keys(partials));
  }

  return schema;
}
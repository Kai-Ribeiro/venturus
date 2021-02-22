const { Model } = require('objection');
const guid = require('objection-guid')();
const visibility = require('objection-visibility').default;
const knex = require('./index');
const ValidationError = require('../Errors/ValidationError');

Model.knex(knex);

const handleErrorMessages = (e) => {
  const { params } = e;
  let message;

  if (e.keyword === 'required') {
    message = 'Campo obrigatório';
  } else if (e.keyword === 'unique') {
    message = 'Dado já está em uso';
  } else if (e.keyword === 'minLength') {
    message = `O campo deve ter no mínimo ${params.limit} caractere(s)`;
  } else if (e.keyword === 'format') {
    message = 'Formato do campo está errado';
  } else {
    message = 'O campo possui um erro';
  }

  return message;
};

class BaseModel extends visibility(guid(Model)) {
  static createValidationError(props) {
    const errors = Object.keys(props.data).reduce((result, current) => ({
      ...result,
      [current]: props.data[current].map(handleErrorMessages),
    }), {});

    return new ValidationError(errors);
  }
}

module.exports = BaseModel;

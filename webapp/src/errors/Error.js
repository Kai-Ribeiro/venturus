export default class Error {

  constructor(err) {
    if (typeof(err) == 'object') {
      const response = err?.response;
      this.load(response?.data);
      this.statusCode = response?.status;
    }
    else if (typeof(err) == 'string') {
      this.messages = { error: err };
    }
    else {
      this.messages = {};
    }
  }

  load(data) {
    this.description = data?.description;
    this.messages = data?.messages ?? {};
  }

  clear() {
    this.description = null;
    this.messages = {};
  }

  hasErrors() {
    return Object.keys(this.messages).length > 0;
  }

  hasField(field) {
    return this.messages.hasOwnProperty(field);
  }

  errorDescription() {
    if (this.hasErrors()) {
      return 'Error Saving Data';
    }
    else if (this.statusCode === 403) {
      return 'Permission Denied';
    }

    return this.description;
  }

  messageForField(field) {
    const messages = this.messages[field];

    if (messages && messages.length) {
      return messages[0];
    }

    return [];
  }

}
import React from 'react';

export default function ErrorMessage({ message }) {
  if (message && typeof message === 'string') {
    message = [ message ]
  }

  return (
    <>
      { message ? message.map((m, i) => <div key={ i.toString() } className="alert alert-danger">{ m }</div>) : null }
    </>
  );
}

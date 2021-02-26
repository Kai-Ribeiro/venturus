import React from 'react';
import Toast from './Toast';

export default function Loading({ show, isAlert }) {

  const renderAlert = () => {
    return <div className="alert alert-warning">Carregando...</div>;
  };

  const renderToast = () => {
    return (
      <div className="toast-container">
        <Toast
          color="warning"
          header="Carregando"
          body="Aguarde..."/>
      </div>
    );
  };

  return show && (isAlert ? renderAlert() : renderToast());
}

import React, { useEffect, useContext } from 'react';
import {
  Toast,
  ToastBody,
  ToastHeader
} from 'reactstrap';
import { ToastContext } from '../providers/ToastProvider';

export default ({ id, header, body, color = 'success' }) => {
  const { removeToast } = useContext(ToastContext);

  useEffect(() => {
    const timeout = setTimeout(() => removeToast(id), 5000);

    return () => clearTimeout(timeout);
  }, [ id, removeToast ]);

  let colorClassName = '';
  if (color) {
    colorClassName = `toast-${ color }`;
  }

  return (
    <Toast className={ colorClassName } >
      <ToastHeader toggle={ () => removeToast(id) }>
        { header }
      </ToastHeader>
      <ToastBody>
        { body }
      </ToastBody>
    </Toast>
  );
}

import SweetAlert from 'sweetalert';

export default function(options) {
  SweetAlert({
    title: options.title,
    text: options.text,
    icon: 'warning',
    buttons: [
      'Cancelar',
      {
        text: 'Excluir',
        closeModal: false
      }
    ],
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      return options.onDelete();
    }

    return Promise.resolve(false);
  })
  .then((result) => {
    if (result) {
      options.afterDelete();

      SweetAlert({
        title: options.deleteTitle || 'Item excluído',
        icon: 'success',
      })
    }
  })
  .catch(() => {
    SweetAlert({
      icon: 'warning',
      title: 'Erro',
      text: options.deleteText || 'Não foi possível excluir o item'
    });
  });
}

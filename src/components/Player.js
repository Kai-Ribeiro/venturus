import React from 'react';

function Player (props) {

  const dragStart = (e) => {
    const target = e.target;

    e.dataTransfer.setData('playerId', target.id);
    e.dataTransfer.setData('objectId', props.objectId);
  }

  const dragOver = (e) => {
    e.stopPropagation();
  };

	return (
		<div
			id={ props.id }
			className={ props.className }
      draggable={ props.draggable }
      onDragStart={ dragStart }
			onDragOver={ dragOver }
		>
			{ props.children }
		</div>
	)
}

export default Player;

import React, { useState } from 'react';

function Board (props) {
	const [ player, setPlayer ] = useState([]);

	const drop = (e) => {
		e.preventDefault();
		const playerName = (props.onDrop(e).player_name).split(" ");

		setPlayer(playerName[0][0] + '' + playerName[1][0]);
	}

	const dragOver = (e) => {
		e.preventDefault();
	}

	return (
		<div 
			id={props.id}
			className={props.className}
			onDrop={drop}
			onDragOver={dragOver}
		>
			<i className="icon-color fas fa-plus" hidden={ player.length > 0 }/>
			{ player }
		</div>
	)
}

export default Board;
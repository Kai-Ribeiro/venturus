import React, { useEffect, useState } from 'react';

function Position (props) {
	const [ player, setPlayer ] = useState('');
	
	useEffect(() => {
		if (!props.player) return;

		if (props.player) {
			const name = props.player.player_name.split(" ");
			setPlayer(name[0][0] + name[1][0]);
		} else {
			setPlayer('');
		}
	}, [ props.player ])

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
			line={props.line}
			col={props.col}
		>
			<i className="icon-color fas fa-plus" hidden={ player }/>
			{ player }
		</div>
	)
}

export default Position;
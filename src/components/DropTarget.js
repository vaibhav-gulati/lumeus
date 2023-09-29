// src/DropTarget.js
import React from 'react';
import { useDrop } from 'react-dnd';

const DropTarget = ({ onDrop }) => {
  const [, drop] = useDrop({
    accept: 'CONTAINER',
    drop: (item) => onDrop(item),
  });

  return (
    <div
      className="drop-target"
      ref={drop}
      style={{
        minHeight: '50px', // Adjust this to set the minimum height for drop target
        border: '2px dashed #ccc', // Add a dashed border to indicate drop target
        padding: '10px',
      }}
    >
      Drop here
    </div>
  );
};

export default DropTarget;

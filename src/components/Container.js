import React, { useEffect, useRef } from 'react';
import './Container.css'; 
import * as d3 from 'd3';

function Container() {
  const treeContainerRef = useRef(null);

  useEffect(() => {
    const data = {
      name: 'Google',
      children: [
        { name: 'New York Sites' },
        { name: 'New Jersey Site' },
        { name: 'Vermont Site' },
        { name: 'Massachussets Site' },
        { name: 'California Site' },
      ],
    };

    const width = window.innerWidth; 
    const height = window.innerHeight; 

    const svg = d3
      .select(treeContainerRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    
    const treeLayout = d3.tree().size([width, height]);
    

    const root = d3.hierarchy(data);
    treeLayout(root);
    
    const centerX = width / 2;
    const centerY = height / 2;

    
    root.descendants().forEach((d) => {
      if (d.data.name === 'Google') {
        d.x = centerX; 
        d.y = centerY - 100; 
      } if(d.data.name === 'New York Sites') {
        d.x = centerX - 200;
        d.y = centerY + 100; // Adjust the margin bottom value as needed
      } 
      if(d.data.name === 'New Jersey Site') {
        // Margin bottom for node 'b'
        d.x = centerX ; // Center horizontally
        d.y = centerY + 100; // Adjust the margin bottom value as needed
      } if(d.data.name === 'Vermont Site') {
        // Margin bottom for node 'b'
        d.x = centerX + 200; // Center horizontally
        d.y = centerY + 100; // Adjust the margin bottom value as needed
      } if(d.data.name === 'Massachussets Site') {
        // Margin bottom for node 'b'
        d.x = centerX + 400; // Center horizontally
        d.y = centerY + 100; // Adjust the margin bottom value as needed
      } if(d.data.name === 'California Site') {
        // Margin bottom for node 'b'
        d.x = centerX + 600; // Center horizontally
        d.y = centerY + 100; // Adjust the margin bottom value as needed
      } 
    });

    // Create a d3 drag handler
    const drag = d3
      .drag()
      .on('start', onDragStart)
      .on('drag', onDrag)
      .on('end', onDragEnd);

    // Draw links
    const links = svg
      .selectAll('.link')
      .data(root.links())
      .enter()
      .append('path')
      .attr('class', 'link')
      .attr('d', (d) => {
        return (
          'M' + d.source.x + ',' + d.source.y + ' ' + d.target.x + ',' + d.target.y
        );
      });

    // Draw nodes as square containers and make them draggable
    const nodes = svg
      .selectAll('.node')
      .data(root.descendants())
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', (d) => `translate(${d.x},${d.y})`)
      .call(drag); // Apply the drag behavior to the nodes

    nodes
      .append('rect')
      .attr('width', 180) // Adjust the width of the square
      .attr('height', 40) // Adjust the height of the square
      .attr('x', -90) // Offset to center the square
      .attr('y', -20) // Offset to center the square
      .style('fill', '#007acc'); // Fill color for the square

    nodes
      .append('text')
      .attr('dy', '0.35em')
      .attr('text-anchor', 'middle')
      .style('fill', 'white') // Text color
      .text((d) => d.data.name); // Display node name

    // Drag start function
    function onDragStart(event, d) {
      d3.select(this).raise().classed('active', true);
    }

    // Drag function
    function onDrag(event, d) {
      // Move the dragged node and its outgoing edges
      d.x = event.x;
      d.y = event.y;
      d3.select(this).attr('transform', `translate(${d.x},${d.y})`);

      // Update the positions of connected edges
      links.each(function (linkData) {
        if (linkData.source === d) {
          d3.select(this).attr('d', () => {
            return (
              'M' +
              d.x +
              ',' +
              d.y +
              ' ' +
              linkData.target.x +
              ',' +
              linkData.target.y
            );
          });
        }
      });

      // Update the position of edges connected to the dragged node
      links.each(function (linkData) {
        if (linkData.target === d) {
          d3.select(this).attr('d', () => {
            return (
              'M' +
              linkData.source.x +
              ',' +
              linkData.source.y +
              ' ' +
              d.x +
              ',' +
              d.y
            );
          });
        }
      });
    }

    // Drag end function
    function onDragEnd(event, d) {
      d3.select(this).classed('active', false);
    }
  }, []);

  return <div className="tree-container" ref={treeContainerRef}></div>;
}

export default Container;

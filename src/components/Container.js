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
        d.y = centerY + 100; 
      } 
      if(d.data.name === 'New Jersey Site') {
        d.x = centerX ; 
        d.y = centerY + 100; 
      } if(d.data.name === 'Vermont Site') {
        d.x = centerX + 200; 
        d.y = centerY + 100; 
      } if(d.data.name === 'Massachussets Site') {
        d.x = centerX + 400;
        d.y = centerY + 100; 
      } if(d.data.name === 'California Site') {
        d.x = centerX + 600; 
        d.y = centerY + 100; 
      } 
    });

    const drag = d3
      .drag()
      .on('start', onDragStart)
      .on('drag', onDrag)
      .on('end', onDragEnd);

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

    
    const nodes = svg
      .selectAll('.node')
      .data(root.descendants())
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', (d) => `translate(${d.x},${d.y})`)
      .call(drag); 

    nodes
      .append('rect')
      .attr('width', 180) 
      .attr('height', 40) 
      .attr('x', -90) 
      .attr('y', -20) 
      .style('fill', '#007acc'); 

    nodes
      .append('text')
      .attr('dy', '0.35em')
      .attr('text-anchor', 'middle')
      .style('fill', 'white') 
      .text((d) => d.data.name);

    function onDragStart(event, d) {
      d3.select(this).raise().classed('active', true);
    }

    function onDrag(event, d) {
      d.x = event.x;
      d.y = event.y;
      d3.select(this).attr('transform', `translate(${d.x},${d.y})`);

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

    function onDragEnd(event, d) {
      d3.select(this).classed('active', false);
    }
  }, []);

  return <div className="tree-container" ref={treeContainerRef}></div>;
}

export default Container;

import React from 'react';

const StringToComponent = ({ htmlString, id }) => {
  return (
    <div id={id} dangerouslySetInnerHTML={{ __html: htmlString }} />
  );
};

export default StringToComponent;
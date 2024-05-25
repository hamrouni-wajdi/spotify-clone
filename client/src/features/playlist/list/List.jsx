import React from 'react';
import styled from 'styled-components';
import ListHeader from './ListHeader.jsx';
import Row from './Row.jsx';

const StyledList = styled.div`
  color: var(--color-text-sub);
`;

const List = ({ list }) => {
  return (
    <StyledList>
      <ListHeader />
      {list.map((el, i) => (
        <Row key={el.id} index={i} playlist={el} />
      ))}
    </StyledList>
  );
};

export default List;

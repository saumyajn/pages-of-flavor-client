// src/components/BookCard.jsx
import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  width: 200px;
  height: 230px;
  background: ${({ theme }) => theme.palette.background.default};
  border: 2px solid ${({ theme }) => theme.palette.secondary.main};
  border-radius: 16px;
  padding: 16px;
  margin: 12px;
  text-align: center;
  font-weight: bold;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

const Title = styled.div`
  color: ${({ theme }) => theme.palette.primary.main};
  font-family: ${({ theme }) => theme.typography.h1.fontFamily};
  font-size: 1.1rem;
`;

export default function BookCard({ book }) {
  return (
    <Card>
      <Title>{book.title}</Title>
    </Card>
  );
}

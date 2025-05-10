import React, { useEffect, useState } from 'react';
import { fetchBooks } from '../api/bookApi';
import styled from 'styled-components';
import { generatePastelFromTheme } from '../theme/util';
import { useTheme } from '@mui/material';

const PageWrapper = styled.div.attrs(()=>({
  className:'page-wrapper'
}))`
  background-color: ${({ theme }) => theme.palette.background.default};
  min-height: 100vh;
  padding: 32px 16px;

  @media (max-width: 480px) {
    padding: 16px 8px;
  }
`;

const PageTitle =  styled.h2.attrs(()=>({
  className:'page-title'
}))`
  font-family: ${({ theme }) => theme.typography.h1.fontFamily};
  text-align: center;
  color: ${({ theme }) => theme.palette.primary.main};
  margin-bottom: 32px;
`;

const ShelfContainer = styled.div.attrs(()=>({
  className:'shelf-container'
}))`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 60px;
  max-width: 1100px;
  margin: 0 auto;
  width: 100%;
`;

const ShelfBox = styled.div.attrs(()=>({
  className:'shelf-box'
}))`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px 16px 0;
  box-sizing: border-box;
  background: #4b2f1d;
  border: 6px solid #3e2817;
  position: relative;
  border-radius: 2px;
   box-shadow:
    -4px 0 6px rgba(0, 0, 0, 0.15),
    4px 0 8px rgba(0, 0, 0, 0.25),
    inset 1px 0 3px rgba(255, 255, 255, 0.1),
    inset -2px 0 3px rgba(0, 0, 0, 0.25),
    inset 2px 0 4px rgba(0, 0, 0, 0.15);

  &::before {
    content: '';
    position: absolute;
    top: 6px;
    left: 6px;
    right: 6px;
    bottom: 0;
    background: #3a2414;
    box-shadow:
      inset 0 8px 8px rgba(0, 0, 0, 0.35),
      inset 0 -6px 8px rgba(0, 0, 0, 0.3),
      inset 2px 0 4px rgba(0, 0, 0, 0.1),
      inset -2px 0 4px rgba(0, 0, 0, 0.1);
    z-index: 0;
    border-radius: 1px;
  }

  display: grid;
  grid-auto-flow: column;
  align-items: end;
  justify-content: start;
  gap: 16px;
  min-height: 160px;
  z-index: 1;

  > * {
    position: relative;
    z-index: 2;
    align-self: end;
  }

  @media (max-width: 768px) {
    max-width: 90%;
    padding: 25px 16px 0;
  }

  @media (max-width: 480px) {
    max-width: 90%;
    gap: 12px;
    padding: 25px 16px 0;
  }
`;

const Book = styled.div.attrs(()=>({
  className:'book'
}))`
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
  padding: 8px 4px;
  background-color: ${({ color }) => color};
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  writing-mode: vertical-rl;
  font-family: ${({ theme }) => theme.typography.h1.fontFamily};
  color: ${({ theme }) => theme.palette.primary.main};
  font-size: 0.85rem;
  font-weight: 500;
  letter-spacing: 0.03em;
  border: 1px solid rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  position: relative;
  text-align: center;
  transform: ${({ tilt }) => `rotate(${tilt}deg)`};
   box-shadow:
    -4px 0 6px rgba(0, 0, 0, 0.15),
    4px 0 8px rgba(0, 0, 0, 0.25),
    inset 5px 0 3px rgba(255, 255, 255, 0.1),
    inset -2px 0 3px rgba(0, 0, 0, 0.25);
  perspective: 5.5cm;
 & span {
    z-index: 2;
    position: relative;
  }

  &::before {
    content: '';
    position: absolute;
    top: 5px;
    left: 0;
    height: 2px;
    width: 100%;
    background-color: ${({ theme }) => theme.palette.primary.main};
    display: ${({ decoration }) =>
      decoration === 'top' || decoration === 'both' ? 'block' : 'none'};
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 5px;
    left: 0;
    height: 2px;
    width: 100%;
    background-color: ${({ theme }) => theme.palette.primary.main};
     box-shadow: inset -2px 0 4px rgba(0, 0, 0, 0.3);
    display: ${({ decoration }) =>
      decoration === 'bottom' || decoration === 'both' ? 'block' : 'none'};
  }

  &:hover {
    transform: scale(1.08);
    box-shadow: 6px 10px 20px rgba(0, 0, 0, 0.35);
    z-index: 1;
  }

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }

  @media (max-width: 480px) {
    font-size: 0.65rem;
  }
`;

function getRandomDecoration() {
  const options = ['top', 'bottom', 'both'];
  return options[Math.floor(Math.random() * options.length)];
}

function generateBookSize() {
  const widths = [30, 35, 40, 45, 50, 55];
  const heights = [90, 100, 110, 120, 130, 140];
  const width = widths[Math.floor(Math.random() * widths.length)];
  const height = heights[Math.floor(Math.random() * heights.length)];
  return { width, height };
}

function getSelectiveTilt() {
  const tilt = (Math.random() * 8 + 2) * (Math.random() < 0.5 ? -1 : 1);
  return Math.round(tilt);
}

function getBooksPerRow() {
  const width = window.innerWidth;
  if (width <= 480) return 4;
  if (width <= 768) return 6;
  return 10;
}

export default function HomePage() {
  const [books, setBooks] = useState([]);
  const [booksPerRow, setBooksPerRow] = useState(getBooksPerRow());
  const theme = useTheme();
  const baseColors = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.contrast.main,
    theme.palette.muted.main,
  ].filter(Boolean);

  useEffect(() => {
    fetchBooks().then(setBooks).catch(console.error);

    const handleResize = () => {
      setBooksPerRow(getBooksPerRow());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const rowCount = Math.ceil(books.length / booksPerRow);
  const bookRows = [];
  for (let i = 0; i < rowCount; i++) {
    const rowBooks = books.slice(i * booksPerRow, (i + 1) * booksPerRow);
    bookRows.push(rowBooks);
  }

  return books.length === 0 ? null : (
    <PageWrapper>
      <PageTitle >📚 Pages of Flavor</PageTitle>
      <ShelfContainer>
        {bookRows.map((rowBooks, rowIndex) => (
          <ShelfBox key={rowIndex}>
            {rowBooks.map((book, index) => {
              const { width, height } = generateBookSize();
              const color = generatePastelFromTheme(baseColors);
              const tilt = Math.random() < 0.3 ? getSelectiveTilt() : 0;
              return (
                <Book
                  key={book.id}
                  color={color}
                  width={width}
                  height={height}
                  tilt={tilt}
                  decoration={getRandomDecoration()}
                >
                  <span>{book.title}</span>
                </Book>
              );
            })}
          </ShelfBox>
        ))}
      </ShelfContainer>
    </PageWrapper>
  );
}

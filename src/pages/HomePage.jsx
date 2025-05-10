import React, { useEffect, useState } from 'react';
import { fetchBooks } from '../api/bookApi';
import styled from 'styled-components';
import { generatePastelFromTheme } from '../theme/util';
import { useTheme } from '@mui/material';

const PageWrapper = styled.div`
  background-color: ${({ theme }) => theme.palette.background.default};
  min-height: 100vh;
  padding: 32px 16px;

  @media (max-width: 480px) {
    padding: 16px 8px;
  }
`;

const PageTitle = styled.h2`
  font-family: ${({ theme }) => theme.typography.h1.fontFamily};
  text-align: center;
  color: ${({ theme }) => theme.palette.primary.main};
  margin-bottom: 32px;
`;

const ShelfContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 60px;
  max-width: 1100px;
  margin: 0 auto;
  width: 100%;
`;

const ShelfBox = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 12px;
  box-sizing: border-box;
  border-radius: 10px;
  background: linear-gradient(to bottom, #8b5e3c, #5c4033); /* rich outer wood */
  box-shadow:
    0 4px 8px rgba(0, 0, 0, 0.2),
    inset 0 -4px 6px rgba(0, 0, 0, 0.2); /* outer and inner glow */
  position: relative;

  /* 👇 Hollow inside look */
  &::before {
    content: '';
    position: absolute;
    top: 6px;
    left: 6px;
    right: 6px;
    bottom: 6px;
    background: linear-gradient(to bottom, #f8f1e4, #e0d6c2); /* lighter hollow area */
    border-radius: 6px;
    z-index: 0;
  }

  display: flex;
  justify-content: center;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 16px;
  min-height: 160px;

  z-index: 1;

  > * {
    position: relative;
    z-index: 2; /* ensures books are above the hollow base */
  }

  @media (max-width: 768px) {
    max-width: 90%;
  }

  @media (max-width: 480px) {
    max-width: 95%;
    gap: 12px;
    padding: 10px;
  }
`;




const Book = styled.div`
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
  padding: 8px 4px;
  background-color: ${({ color }) => color};
  border-radius: 4px;
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
  transform: scale(1); /* reset from old rotate */
  box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.15); /* subtle right-bottom shadow */

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
    display: ${({ decoration }) =>
      decoration === 'bottom' || decoration === 'both' ? 'block' : 'none'};
  }

  &:hover {
    transform: scale(1.08);
    box-shadow: 4px 6px 14px rgba(0, 0, 0, 0.25); /* richer shadow on hover */
    z-index:1;
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
// Generate varied width/height
function generateBookSize() {
    const widths = [30, 35, 40, 45, 50, 55];
    const heights = [90, 100, 110, 120, 130, 140];
    const width = widths[Math.floor(Math.random() * widths.length)];
    const height = heights[Math.floor(Math.random() * heights.length)];
    return { width, height };
}

// Responsive row size calculator
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
        theme.palette.muted.main
    ].filter(Boolean); // filter out undefined values


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
            <PageTitle>📚 Pages of Flavor</PageTitle>
            <ShelfContainer>
                {bookRows.map((rowBooks, rowIndex) => (
                    <ShelfBox key={rowIndex}>
                        {rowBooks.map(book => {
                            const { width, height } = generateBookSize();
                            const color = generatePastelFromTheme(baseColors);
                            return (
                                <Book
                                    key={book.id}
                                    color={color}
                                    width={width}
                                    height={height}

                                    decoration={getRandomDecoration()}
                                >
                                    <span>    {book.title}</span>
                                </Book>
                            );
                        })}
                        
                    </ShelfBox>
                ))}
            </ShelfContainer>
        </PageWrapper>
    );
}

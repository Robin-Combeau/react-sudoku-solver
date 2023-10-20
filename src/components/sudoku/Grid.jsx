import React, { useState, useEffect } from 'react';

export default function Grid({ buttonClickInfo, setButtonClickInfo, onError }) {
  // States and Constants
  const emptyGrid = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];
  const [grid, setGrid] = useState(emptyGrid);

  // Fetch a new grid from the external API
  const fetchNewGrid = (errorMessage) => {
    fetch('https://sudoku-api.vercel.app/api/dosuku')
      .then((response) => response.json())
      .then((data) => {
        const newGrid = data.newboard.grids[0].value;
        setGrid(newGrid);
      })
      .catch((error) => {
        console.error(errorMessage, error);
        setGrid(emptyGrid);
      });
  };

  // Use Effects
  useEffect(() => {
    fetchNewGrid('Error fetching initial grid:');
  }, []);

  // Button Events
  useEffect(() => {
    // "Clear" Button
    if (buttonClickInfo === 'clear') {
      setGrid(emptyGrid);
    }
    // "New Grid" Button
    else if (buttonClickInfo === 'new') {
      setGrid(emptyGrid);
      fetchNewGrid('Error fetching new grid:');
    }
    // "Solve" Button
    else if (buttonClickInfo === 'solve') {
      solveSudoku();
    }
    setButtonClickInfo('');
  }, [buttonClickInfo]);

  // Update grid on every right input
  const inputChange = (event, rowIndex, colIndex) => {
    const newValue = parseInt(event.target.value) || 0;

    // Force value between 0 and 9
    if (newValue >= 0 && newValue <= 9) {
      const newGrid = [...grid];
      newGrid[rowIndex][colIndex] = newValue;
      setGrid(newGrid);
    }
  };

  // Solve Sudoku algorithm
  const solveSudoku = () => {
    const solvedGrid = [...grid];

    function isValid(r, c, num) {
      for (let i = 0; i < 9; i++) {
        if (solvedGrid[r][i] === num || solvedGrid[i][c] === num) {
          return false;
        }
      }

      const boxRow = Math.floor(r / 3) * 3;
      const boxCol = Math.floor(c / 3) * 3;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (solvedGrid[boxRow + i][boxCol + j] === num) {
            return false;
          }
        }
      }
      return true;
    }

    // Callback function solving the sudoku
    function solve() {
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          if (solvedGrid[row][col] === 0) {
            for (let num = 1; num <= 9; num++) {
              if (isValid(row, col, num)) {
                solvedGrid[row][col] = num;
                if (solve()) {
                  return true;
                }
                solvedGrid[row][col] = 0;
              }
            }
            return false;
          }
        }
      }
      return true;
    }

    if (solve()) {
      setGrid(solvedGrid);
    } else {
      onError('There is an error in the grid. No solution was found.');
    }
  };

  return (
    <>
      <div className="relative grid-container inline-grid grid-rows-9 grid-cols-9 border border-slate-300">
        <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none ">
          <div className="border-x-2 border-t-2 border-slate-400"></div>
          <div className="border-r-2 border-t-2 border-slate-400"></div>
          <div className="border-r-2 border-t-2 border-slate-400"></div>
          <div className="border-x-2 border-t-2 border-slate-400"></div>
          <div className="border-r-2 border-t-2 border-slate-400"></div>
          <div className="border-r-2 border-t-2 border-slate-400"></div>
          <div className="border-x-2 border-y-2 border-slate-400"></div>
          <div className="border-r-2 border-y-2 border-slate-400"></div>
          <div className="border-r-2 border-y-2 border-slate-400"></div>
        </div>
        {grid.map((row, rowIndex) =>
          row.map((value, colIndex) => (
            <input
              key={rowIndex * 9 + colIndex}
              type="number"
              value={value || ''} // if value = false (0 is false)
              onChange={(e) => inputChange(e, rowIndex, colIndex)}
              className="w-8 h-8 text-center border border-slate-300 focus:outline-0 focus:border-slate-500"
            />
          ))
        )}
      </div>
    </>
  );
}

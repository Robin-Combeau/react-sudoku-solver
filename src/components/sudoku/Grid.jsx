import React, { useState, useEffect } from 'react';

export default function Grid({ buttonClickInfo, setButtonClickInfo }) {
  //TODO - mettre une grille aléatoire au début
  const initialGrid = [
    [0, 0, 4, 0, 5, 0, 0, 0, 0],
    [9, 0, 0, 7, 3, 4, 6, 0, 0],
    [0, 0, 3, 0, 2, 1, 0, 4, 9],
    [0, 3, 5, 0, 9, 0, 4, 8, 0],
    [0, 9, 0, 0, 0, 0, 0, 3, 0],
    [0, 7, 6, 0, 1, 0, 9, 2, 0],
    [3, 1, 0, 9, 7, 0, 2, 0, 0],
    [0, 0, 9, 1, 8, 2, 0, 0, 3],
    [0, 0, 0, 0, 6, 0, 1, 0, 0]
  ];

  const [grid, setGrid] = useState(initialGrid);

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

  const clearGrid = () => {
    const clearGrid = [
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
    setGrid(clearGrid);
  };

  // "Clear" Button
  useEffect(() => {
    if (buttonClickInfo === 'clear') {
      clearGrid();
      setButtonClickInfo('');
    }
  }, [buttonClickInfo, setButtonClickInfo]);

  // "New" Button
  useEffect(() => {
    if (buttonClickInfo === 'new') {
      // Fetch a new grid
      fetch('https://sudoku-api.vercel.app/api/dosuku')
        .then((response) => response.json())
        .then((data) => {
          const newGrid = data.newboard.grids[0].value;
          setGrid(newGrid);
        })
        .catch((error) => {
          console.error('Error fetching new grid:', error);
        });
      setButtonClickInfo('');
    }
  }, [buttonClickInfo, setButtonClickInfo, setGrid]);


  // Solve Sudoku algorithm
  const solveSudoku = () => {
    const solvedGrid = grid.map(row => [...row]);

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
      // TODO - Update this to display a text a the bottom maybe
      alert('no solution');
    }

  };

  // "Solve" button
  useEffect(() => {
    if (buttonClickInfo === 'solve') {
      solveSudoku();
      setButtonClickInfo('');
    }
  }, [buttonClickInfo, setButtonClickInfo]);

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
              className="w-8 h-8 text-center border border-slate-300 focus:outline-0"
              data-x={colIndex}
              data-y={rowIndex}
            />
          ))
        )}
      </div>
    </>
  );
}

import React, { useState } from 'react';
import Grid from '../components/sudoku/Grid'
import Controls from '../components/sudoku/Controls';

export default function SudokuSolver() {

    const [buttonClickInfo, setButtonClickInfo] = useState('');

    const handleButtonClick = (info) => {
        // Update the "buttonclick" information when a button is clicked ('new', 'solve' or 'clear')
        setButtonClickInfo(info);
    };

    return (
        <div className="text-center">
            <h1 className="text-4xl font-bold mt-5 mb-2 text-slate-900">Sudoku Solver</h1>
            <p className="text-1xl mb-10 text-slate-800">by Robin C.</p>
            <Grid buttonClickInfo={buttonClickInfo} setButtonClickInfo={setButtonClickInfo} />
            <Controls onButtonClick={handleButtonClick} />
            {/* <p>ClickInfo: {buttonClickInfo}</p> */}
        </div>
    );
}

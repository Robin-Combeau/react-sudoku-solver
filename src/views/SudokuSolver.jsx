import React, { useState } from 'react';
import Grid from '../components/sudoku/Grid'
import Controls from '../components/sudoku/Controls';

export default function SudokuSolver() {

    const [buttonClickInfo, setButtonClickInfo] = useState('');
    const [error, setError] = useState('');

    const handleButtonClick = (info) => {
        // Update the "buttonclick" information when a button is clicked ('new', 'solve' or 'clear')
        setError('');
        setButtonClickInfo(info);

    };

    // Function to set the error message
    const handleError = (errorMessage) => {
        setError(errorMessage);
    };

    return (
        <div className="text-center">
            <h1 className="text-4xl font-bold mt-5 mb-2 text-slate-900">Sudoku Solver</h1>
            <p className="mb-10 text-slate-800">by Robin C.</p>
            <Grid buttonClickInfo={buttonClickInfo} setButtonClickInfo={setButtonClickInfo} onError={handleError}/>
            <Controls onButtonClick={handleButtonClick} />
            {/* <p>ClickInfo: {buttonClickInfo}</p> */}
            {error && <p className="font-bold text-red-600">{error}</p>} {/* Display the error message if it exists */}
        </div>
    );
}

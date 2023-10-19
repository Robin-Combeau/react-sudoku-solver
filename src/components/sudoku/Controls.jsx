import React from 'react'
import Button from './Button'

export default function Controls({ onButtonClick }) {
  const buttonClick = (buttonAction) => {
    onButtonClick(buttonAction);
  };

  return (
    <div className="mt-5">
      <Button onClick={() => buttonClick("new")} innerHTML="New Grid" />
      <Button onClick={() => buttonClick("solve")} innerHTML="Solve" />
      <Button onClick={() => buttonClick("clear")} innerHTML="Clear" />
    </div>
  )
}

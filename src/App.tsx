import { useState } from "react";
import "./App.css";

function App() {
    return (
      <Game />
    )
}

type Board = Array<'' | 'X' | 'O'>

function Game() {
  const [history, setHistory] = useState<Array<Board>>([Array(9).fill('')])
  const [currMove, setCurrMove] = useState(0)
  const nextMove = currMove % 2 === 0 ? 'X' : 'O'
  const currentBoard = history[currMove]

  function handlePlay(nextBoard: Board) {
    setHistory([...history.slice(0, currMove + 1), nextBoard])
    setCurrMove(currMove + 1)
  }

  function jumpTo(idx: number) {
    setCurrMove(idx)
  }

  const moves = history.map((_, idx) => {
    let description = 'Go to game start'
    if (idx > 0) {
      description = `Go to move #${idx}`
    }
    
    return (
      <li key={idx}>
        <button onClick={() => jumpTo(idx)}>{description}</button>
      </li>
    )
  })
  
  return (
    <div className="game">
      <div className="game-board">
        <Board board={currentBoard} nextMove={nextMove} onPlay={handlePlay} anyMoreTurns={currMove < 9}/>
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  )
  
}

type BoardProp = {
  board: Board
  nextMove: 'X' | 'O'
  onPlay: (nextBoard: Board) => void
  anyMoreTurns: boolean
}

function Board({board, nextMove, onPlay, anyMoreTurns}: BoardProp, ) {
  const winner = calculateWinner(board)
  function handleSquareClick(i: number) {
    if(board[i] !== '') {
      return
    }
    if(winner !== '') {
      return
    }
    const newBoard = [...board]
    newBoard[i] =  nextMove
    onPlay(newBoard)
  }
  let status = `Next player: ${nextMove}`
  if(winner != '') {
    status = `Winner: ${winner}`
  } else if(!anyMoreTurns) {
    status = 'Draw'
  }
  return (
    <>
      <div className='status'>{status}</div>
      <div className="board-row">
        <Square value={board[0]} onSquareClick={() => handleSquareClick(0)}/>
        <Square value={board[1]} onSquareClick={() => handleSquareClick(1)}/>
        <Square value={board[2]} onSquareClick={() => handleSquareClick(2)}/>
      </div>
      <div className="board-row">
        <Square value={board[3]} onSquareClick={() => handleSquareClick(3)}/>
        <Square value={board[4]} onSquareClick={() => handleSquareClick(4)}/>
        <Square value={board[5]} onSquareClick={() => handleSquareClick(5)}/>
      </div>
      <div className="board-row">
        <Square value={board[6]} onSquareClick={() => handleSquareClick(6)}/>
        <Square value={board[7]} onSquareClick={() => handleSquareClick(7)}/>
        <Square value={board[8]} onSquareClick={() => handleSquareClick(8)}/>
      </div>
    </>
  )
}


type SquareProps = {
  value: "" | "X" | "O"
  onSquareClick: () => void
}
function Square({value, onSquareClick}: SquareProps) {

  return <button className="square" onClick={onSquareClick}>{value}</button>
}


function calculateWinner(board: Array<'' | 'X' | 'O'>): 'X' | 'O' | '' {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for(const [a, b, c] of lines) {
    if(board[a] != '' && board[a] === board[b] && board[b] === board[c]) {
      return board[a]
    }
  }

  return ''
}

export default App;
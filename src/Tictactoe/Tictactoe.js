import React, {useState} from 'react';
import './Tictactoe.css';

const Tictactoe = () => {
    const [turn, setTurn] = useState('X');
   
    const [cells, setCells] = useState(Array(9).fill(''));

    const [winner, setWinner] = useState();

    const chkWin = (squares) => {
        let wincond = {
            horizontol: [
                [0,1,2],
                [3,4,5],
                [6,7,8]
            ],

            vertical: [
                [0,3,6],
                [1,4,7],
                [2,5,8]
            ],

            diagonal: [
                [0,4,8],
                [6,4,2]
            ],
        }
    
    

        for(let shape in wincond) {
            wincond[shape].forEach((pattern) => {
                if (
                    squares[pattern[0]] === '' ||
                    squares[pattern[1]] === '' ||
                    squares[pattern[2]] === '' 
                ) {
                    //do nothing
                }
                else if (
                    squares[pattern[0]] === squares[pattern[1]] &&
                    squares[pattern[1]] === squares[pattern[2]]
                ) {
                    setWinner(squares[pattern[0]])
                }
            });
        };
    }
    function handleClick({ num }) {
        if (cells[num] !== '') {
            //no need to do anything
            return;
        };
        let squares = [...cells];

        if (turn === 'X') {
            squares[num] = 'X';
            setTurn('O');
        }
        else {
            squares[num] = ('O');
            setTurn('X');
        }
        chkWin(squares);
        setCells(squares);
        console.log(squares);

    }

    const Restart = () => {
        setWinner(null);
        setCells(Array(9).fill(''));
    }

    const Cell = ({num}) => {
        return <td onClick={() => handleClick({num})}>{cells[num]}</td>;
    };


  return (
    <div className='container'>
        <table>
            It's {turn}'s Turn.
            <tbody>
                <tr>
                    <Cell num={0}/>
                    <Cell num={1}/>
                    <Cell num={2}/>
                </tr>
                <tr>
                    <Cell num={3}/>
                    <Cell num={4}/>
                    <Cell num={5}/>
                </tr>
                <tr>
                    <Cell num={6}/>
                    <Cell num={7}/>
                    <Cell num={8}/>
                </tr>
            </tbody>
        </table>
        {winner && (
            <>
                <p>{winner} is the winner!</p>
                <button onClick={() => Restart()}>Play Again?</button>
            </>
        )}
    </div>
    );
}

export default Tictactoe;
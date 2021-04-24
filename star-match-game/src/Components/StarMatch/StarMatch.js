import { useEffect, useState } from "react";
import utils from "./../../utils.js";

// Color Theme
const colors = {
    available: 'lightgray',
    used: 'lightgreen',
    wrong: 'lightcoral',
    candidate: 'deepskyblue',
  };

const PlayNumber = (props) => (
    <button 
        className="number"
        style={{backgroundColor: colors[props.status]}}
        onClick = {() => {
            props.onClick(props.number, props.status)
        }}
    >
        {props.number}
    </button>
)

const StarsDisplay = (props) => (
    <> 
    {utils.range(1, props.count).map(starId => (
        <div key={starId} className="star" />
    )
      )}
    </>
)

const PlayAgain = (props) => (
    <div class="game-done">
        <div className = "message" 
        style = {{color: props.gameStatus=='lost' ? 'red': 'green'}}
        >
            {props.gameStatus == 'lost' ? 'Game Over' : 'Nice'}
        </div>
        <button 
        onClick = {props.onClick}
        >Play Again</button>
    </div>
)

// custom hook
const useGameState = () => {
    const [stars, setStars] = useState(utils.random(1, 9));
    const [availableNums, setAvailableNums] = useState(utils.range(1,9));
    const [candidateNums, setCandidateNums] = useState([]);
    const [secondsLeft, setSecondsLeft] = useState(10);

    useEffect(() => {
        if(secondsLeft > 0 && availableNums.length > 0) {
            const timeId = setTimeout(() => {
                setSecondsLeft(secondsLeft-1);
            }, 1000);
            return () => clearTimeout(timeId);
        }
        
    })

    const setGameState = (newCandidateNums) => {
        if(utils.sum(newCandidateNums) != stars) {
            setCandidateNums(newCandidateNums);
        } else {
            const newAvailableNums = availableNums.filter(
                n => !newCandidateNums.includes(n)
            )
            setStars(utils.randomSumIn(newAvailableNums, 9));
            setAvailableNums(newAvailableNums);
            setCandidateNums([]);
        }
    }

    return {
        stars,
        availableNums,
        candidateNums,
        secondsLeft,
        setGameState
    }
}

const Game = (props) => {
    // const [stars, setStars] = useState(utils.random(1, 9));
    // const [availableNums, setAvailableNums] = useState(utils.range(1,9));
    // const [candidateNums, setCandidateNums] = useState([]);
    // const [secondsLeft, setSecondsLeft] = useState(10);

    // useEffect(() => {
    //     if(secondsLeft > 0 && availableNums.length > 0) {
    //         const timeId = setTimeout(() => {
    //             setSecondsLeft(secondsLeft-1);
    //         }, 1000);
    //         return () => clearTimeout(timeId);
    //     }
        
    // })

    const {
        stars,
        availableNums,
        candidateNums,
        secondsLeft,
        setGameState
    } = useGameState();

    const candidatesAreWrong = utils.sum(candidateNums) > stars;
    const gameStatus = availableNums.length == 0
                        ? 'won'
                        : secondsLeft == 0 ? 'lost': 'active';

    // const resetGame = () => {
    //     setStars(utils.random(1, 9));
    //     setAvailableNums(utils.range(1, 9));
    //     setCandidateNums([]);
    //     setSecondsLeft(10);
    // }

    const numberStatus = (number) => {
        if(!availableNums.includes(number)) {
            return 'used';
        }
        if(candidateNums.includes(number)) {
            return candidatesAreWrong ? 'wrong' : 'candidate';
        }
        return 'available';
    }

    const onNumberClick = (number, currentStaus) => {
        if(gameStatus != 'active' || currentStaus == 'used'){
            return;
        }

        const newCandidateNums = 
        currentStaus == 'available' ? candidateNums.concat(number) : candidateNums.filter(cn => cn != number);
        // if(utils.sum(newCandidateNums) != stars) {
        //     setCandidateNums(newCandidateNums);
        // } else {
        //     const newAvailableNums = availableNums.filter(
        //         n => !newCandidateNums.includes(n)
        //     )
        //     setStars(utils.randomSumIn(newAvailableNums, 9));
        //     setAvailableNums(newAvailableNums);
        //     setCandidateNums([]);
        // }
        setGameState(newCandidateNums);
    }

    return (
      <div className="game">
        <div className="help">
          Pick 1 or more numbers that sum to the number of stars
        </div>
        <div className="body">
          <div className="left">
              {gameStatus != 'active' ? (<PlayAgain onClick={props.startNewGame} gameStatus = {gameStatus}/>) : (<StarsDisplay count = {stars}/>)}
          </div>
          <div className="right">
              {utils.range(1, 9).map(number => (
                  <PlayNumber 
                    key = {number}
                    status = {numberStatus(number)}
                    number = {number} 
                    onClick = {onNumberClick}
                  />
              ))}
          </div>
        </div>
        <div className="timer">Time Remaining: {secondsLeft}</div>
      </div>
    );
  };

const StarMatch = () => {
    const [gameId, setGameId] = useState(1);
    return <Game key={gameId} 
        startNewGame = {() => {
            setGameId(gameId + 1);
        }}
    />;
}

  export default StarMatch;
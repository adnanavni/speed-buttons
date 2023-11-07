/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import {
  StyledGame,
  StyledGameWrapper,
  StyledButtonsWrapper,
  StyledTextWrapper,
  StyledRoundDiv,
  StyledButton,
} from "./components/styledComponents";

const COLORS = ["red", "green", "blue", "yellow"];
const KEYS = ["d", "f", "j", "k"];
let INTERVAL: number = 3000;

const getRandomColor = () => Math.floor(Math.random() * COLORS.length);

function App() {
  const [visibleColors, setVisibleColors] = useState<string[]>([]);
  const [queue, setQueue] = useState<string[]>([]);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [points, setPoints] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);
  const gameRef = useRef<boolean>(false);

  const gameOn = () => {
    setTimeout(() => {
      queueNext();
    }, INTERVAL);
  };

  const queueNext = () => {
    if (!gameRef.current) return;
    const newColorIndex = getRandomColor();
    const newColor = COLORS[newColorIndex];

    setQueue((queue) => queue.concat([newColor]));

    const newVisibleColors = Array(4).fill("transparent" as string);
    newVisibleColors[newColorIndex] = newColor;
    setVisibleColors(newVisibleColors);

    gameOn();
  };

  const handleClick = (color: string) => {
    if (color !== queue[queue.length - 1]) {
      handleStop();
    } else {
      const indexofColor = COLORS.indexOf(color);
      const newVisibleColors = [...visibleColors];
      newVisibleColors[indexofColor] = "transparent";
      setVisibleColors(newVisibleColors);
      setQueue((queue) => queue.slice(1));

      if (gameRef.current) setPoints((points) => points + 1);

      INTERVAL -= 50;
    }
  };

  const handleStart = () => {
    setGameOver(false);
    gameRef.current = true;
    setVisibleColors(Array(4).fill("transparent"));
    setQueue([]);
    INTERVAL = 3000;
    setPoints(0);
    gameOn();
  };

  const handleStop = () => {
    setGameOver(true);
    gameRef.current = false;
    setVisibleColors([]);
    if (points > highScore) {
      setHighScore(points);
      localStorage.setItem("highScore", points.toString());
    }
  };

  useEffect(() => {
    if (queue.length > 4) {
      handleStop();
    }
  }, [queue]);

  useEffect(() => {
    const storedHighScore = localStorage.getItem("highScore");
    if (storedHighScore) {
      setHighScore(parseInt(storedHighScore, 10));
    }
  }, []);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (KEYS.includes(event.key)) {
        const index = KEYS.indexOf(event.key);
        const color = visibleColors[index];
        handleClick(color);
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [visibleColors]);

  return (
    <StyledGame>
      <h1>Speed Tester</h1>
      {gameOver && (
        <h2>
          Great Game! <br /> Press Start to play again
        </h2>
      )}
      <StyledGameWrapper>
        <StyledTextWrapper>
          <p>Score: {points}</p>
          <p>Best Score: {highScore}</p>
        </StyledTextWrapper>
        <StyledButtonsWrapper>
          {visibleColors.length !== 0
            ? visibleColors.map((color, index) => (
                <StyledRoundDiv
                  key={index}
                  onClick={() => handleClick(color)}
                  style={{
                    backgroundColor: color,
                    boxShadow: `0 0 1rem ${COLORS[index]}`,
                  }}
                >
                  <p>{KEYS[index].toUpperCase()}</p>
                </StyledRoundDiv>
              ))
            : COLORS.map((color, index) => (
                <StyledRoundDiv
                  key={index}
                  style={{
                    backgroundColor: color,
                    boxShadow: `0 0 1rem ${color}`,
                  }}
                >
                  <p>{KEYS[index].toUpperCase()}</p>
                </StyledRoundDiv>
              ))}
        </StyledButtonsWrapper>
        <StyledButtonsWrapper>
          <StyledButton onClick={handleStart}>Start</StyledButton>
          <StyledButton onClick={handleStop}>Stop</StyledButton>
        </StyledButtonsWrapper>
      </StyledGameWrapper>
    </StyledGame>
  );
}

export default App;

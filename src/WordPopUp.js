import { useState, useEffect } from "react";

function WordPopup(props) {
  const [word, setWord] = useState("");
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [color, setColor] = useState("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Generate a random word
      const words = [
        "meow",
        "moeooow",
        "mweohhww",
        "kkkk",
        "psspsspspps",
        "meeoooowww",
      ];
      const colors = [
        "blue",
        "red",
        "green",
        "purple",
        "orange",
        "yellow",
        "indigo",
        "violet",
      ];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      const randomWord = words[Math.floor(Math.random() * words.length)];
      setWord(randomWord);
      setColor(randomColor);

      // Generate random position
      const x = Math.floor(Math.random() * window.innerWidth);
      const y = Math.floor(Math.random() * window.innerHeight);
      setPosition({ x, y });
    }, 5000); // milliseconds

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div>
      {word && (
        <div
          style={{
            position: "absolute",
            top: `${position.y}px`,
            left: `${position.x}px`,
            fontSize: "24px",
            fontWeight: "bold",
            color: `${color}`,
          }}
        >
          <h1>{word}</h1>
        </div>
      )}
    </div>
  );
}

export default WordPopup;

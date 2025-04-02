import { useState, useEffect } from "react";

function WordPopup(props) {
  const [word, setWord] = useState("");
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Generate a random word
      const words = ["meow", "mow", "mweh", "mkkkk", "mrmrmww", "meeoooowww"];
      const randomWord = words[Math.floor(Math.random() * words.length)];
      setWord(randomWord);

      // Generate random position
      const x = Math.floor(Math.random() * window.innerWidth);
      const y = Math.floor(Math.random() * window.innerHeight);
      setPosition({ x, y });
    }, 5000); // 60 seconds

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
          }}
        >
          {word}
        </div>
      )}
    </div>
  );
}

export default WordPopup;

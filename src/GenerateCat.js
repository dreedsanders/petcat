// generate a cat
// generate a day cycle(24hrs)
// define cat actions
// generate a cat cycle for 24 hours
// start a day with a cat

import { React, useState, useEffect } from "react";
import clean from "./cat-cleaning.gif";
import eat from "./cat-eating.gif";
import play from "./cat-playing.gif";
import sleep from "./cat-sleeping.gif";
import talk from "./cat-talking.gif";
import scratch from "./cat-scratching.gif";
import WordPopup from "./WordPopUp";

function GenerateCat() {
  const [dailycat, setDailyCat] = useState({});
  const [catday, setCatday] = useState([]);
  const [currentActionIndex, setCurrentActionIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [imgsrc, setImagesrc] = useState(null);
  const today = new Date();

  const generate = () => {
    let type = [
      "calico",
      "siamese",
      "maine coon",
      "blue",
      "munchkin",
      "persian",
    ];
    let size = ["tiny", "small", "blobby"];
    let age = ["kitten", "adult", "old timer"];

    const cat = {
      type: type[Math.floor(Math.random() * type.length)],
      size: size[Math.floor(Math.random() * size.length)],
      age: age[Math.floor(Math.random() * age.length)],
    };
    return cat;
  };

  const catActions = (kitty) => {
    //  define full day
    const fullDay = { cat: kitty, day: [], maxtime: 1440, totalTime: 0 };

    // define actions for a day
    let meow = ["meow", "mow", "mweh", "mkkkk", "mrmrmww", "meeoooowww"];
    let times = [1, 10, 20, 30, 45, 90];
    let actions = ["nap", "clean", "talk", "eat", "play", "scratch"];

    let addAction = (time) => {
      let action = {
        voice: meow[Math.floor(Math.random() * meow.length)],
        action: actions[Math.floor(Math.random() * actions.length)],
        time: time,
      };

      fullDay.day.push(action);
      fullDay.totalTime += time;
      fullDay.maxtime -= time;
    };

    // while loop that assigns cat actions if that action does not exceed maxtime 1440
    while (fullDay.maxtime > 0) {
      // get random index
      let timeindex = Math.floor(Math.random() * times.length);
      // get time at index
      let time = times[timeindex];

      function checkTime(time, totaltime) {
        return time + totaltime > 1440;
      }

      if (!checkTime(time, fullDay.totalTime)) {
        addAction(time);
      } else {
        times.splice(timeindex, times.length - timeindex);
      } // end of if statement
    } // end of for loop

    return fullDay;
  }; // end of cat actions

  useEffect(() => {
    const cat = generate();
    setDailyCat(cat);
    const day = catActions(cat);
    setCatday(day.day);
    console.log(JSON.parse(JSON.stringify(day))); // Log a snapshot of the object
    console.log(day.day); // Log a reference to the object
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (currentActionIndex >= catday.length) {
        clearInterval(intervalId);
        return;
      }

      if (timeRemaining <= 0) {
        if (currentActionIndex < catday.length - 1) {
          setCurrentActionIndex(currentActionIndex + 1);
          setTimeRemaining(catday[currentActionIndex + 1]?.time * 60);
        } else {
          clearInterval(intervalId);
        }
      } else {
        setTimeRemaining(timeRemaining - 1);
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [catday, currentActionIndex, timeRemaining]);

  useEffect(() => {
    if (catday.length > 0) {
      setTimeRemaining(catday[currentActionIndex]?.time * 60);
    }
  }, [currentActionIndex, catday]);

  const images = [
    { eat: eat },
    { play: play },
    { sleep: sleep },
    { scratch: scratch },
    { talk: talk },
    { clean: clean },
  ];

  const currentAction = catday[currentActionIndex];
  useEffect(() => {
    const findImage = (action) => {
      let src = images.find((image) => image[action]);
      return src && src[action];
    };
    setImagesrc(findImage(currentAction?.action));
  }, [currentAction?.action]);

  return (
    <div>
      <h1>Pet Cat</h1>
      <h5>
        Just imagine its a {dailycat.size}ish {dailycat.age} {dailycat.type} cat
      </h5>
      <p>They are currently {currentAction?.action}ing</p>
      <p>They will do this for {currentAction?.time} minutes</p>
      <p>
        Time Remaining: {Math.floor(timeRemaining / 60)} minutes{" "}
        {timeRemaining % 60} seconds
      </p>
      <img src={imgsrc} />
      <WordPopup word={currentAction?.voice ? currentAction.voice : null} />
    </div>
  );
}

export default GenerateCat;

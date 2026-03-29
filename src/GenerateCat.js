// generate a cat
// generate a day cycle(24hrs)
// define cat actions
// generate a cat cycle for 24 hours
// start a day with a cat

import { useState, useEffect } from "react";
import clean from "./cat-cleaning.gif";
import eat from "./cat-eating.gif";
import play from "./cat-playing.gif";
import nap from "./cat-sleeping.gif";
import talk from "./cat-talking.gif";
import scratch from "./cat-scratching.gif";
import WordPopup from "./WordPopUp";
import "./GenerateCat.css";

const MAX_ACTIVITY_SECONDS = 10;
const DAY_BUDGET_SECONDS = 1440;

const ACTION_IMAGES = {
  eat,
  play,
  nap,
  scratch,
  talk,
  clean,
};

/** Shuffled 1..MAX_ACTIVITY_SECONDS for varied slice lengths */
const ACTIVITY_DURATION_OPTIONS = Array.from(
  { length: MAX_ACTIVITY_SECONDS },
  (_, i) => i + 1
);

function GenerateCat() {
  const [dailycat, setDailyCat] = useState({});
  const [catday, setCatday] = useState([]);
  const [currentActionIndex, setCurrentActionIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [imgsrc, setImagesrc] = useState(null);

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
    const fullDay = {
      cat: kitty,
      day: [],
      maxtime: DAY_BUDGET_SECONDS,
      totalTime: 0,
    };

    let meow = ["meow", "mow", "mweh", "mkkkk", "mrmrmww", "meeoooowww"];
    let times = [...ACTIVITY_DURATION_OPTIONS];
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

    while (fullDay.maxtime > 0) {
      if (times.length === 0) {
        times = ACTIVITY_DURATION_OPTIONS.filter((t) => t <= fullDay.maxtime);
        if (times.length === 0) break;
        continue;
      }

      let timeindex = Math.floor(Math.random() * times.length);
      let time = times[timeindex];

      function checkTime(time, totaltime) {
        return time + totaltime > DAY_BUDGET_SECONDS;
      }

      if (!checkTime(time, fullDay.totalTime)) {
        addAction(time);
      } else {
        times.splice(timeindex, times.length - timeindex);
      }
    }

    return fullDay;
  }; // end of cat actions

  useEffect(() => {
    const cat = generate();
    setDailyCat(cat);
    const day = catActions(cat);
    setCatday(day.day);
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
          setTimeRemaining(catday[currentActionIndex + 1]?.time ?? 0);
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
      setTimeRemaining(catday[currentActionIndex]?.time ?? 0);
    }
  }, [currentActionIndex, catday]);

  const currentAction = catday[currentActionIndex];
  useEffect(() => {
    const action = currentAction?.action;
    setImagesrc(action && ACTION_IMAGES[action] ? ACTION_IMAGES[action] : null);
  }, [currentAction?.action]);

  const actionLabel =
    currentAction?.action === "nap"
      ? "napping"
      : currentAction?.action
        ? `${currentAction.action}ing`
        : "…";

  return (
    <>
      <div className="cat-life">
        <div className="cat-life__inner">
          <h1 className="cat-life__title">Cat Life</h1>
          <p className="cat-life__subtitle">
            Imagine a {dailycat.size}ish {dailycat.age} {dailycat.type}.
          </p>
          <div className="cat-life__status" aria-live="polite">
            <span>
              Right now: <strong>{actionLabel}</strong>
            </span>
            <span className="cat-life__timer">
              {timeRemaining}s left in this activity
            </span>
          </div>
          <figure className="cat-life__media">
            {imgsrc ? (
              <img
                src={imgsrc}
                alt={`Cat ${currentAction?.action || ""}`}
              />
            ) : null}
          </figure>
        </div>
      </div>
      <WordPopup word={currentAction?.voice ? currentAction.voice : null} />
    </>
  );
}

export default GenerateCat;

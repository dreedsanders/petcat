// generate a cat
// generate a day cycle(24hrs)
// define cat actions
// generate a cat cycle for 24 hours
// start a day with a cat

function Generate() {
  let type = ["calico", "siamese", "maine coon", "blue", "munchkin", "persian"];
  let size = ["tiny", "small", "blobby"];
  let age = ["kitten", "young", "adult", "old timer"];

  const cat = {
    type: type[Math.floor(Math.random() * type.length)],
    size: size[Math.floor(Math.random() * size.length)],
    age: age[Math.floor(Math.random() * age.length)],
  };
  return cat;
}

function catActions(cat) {
  //  define full day
  const fullDay = { cat: cat, day: [], maxtime: 1440, totalTime: 0 };

  // define actions for a day
  let meow = ["meow", "mow", "mweh", "mkkkk", "mrmrmww", "meeoooowww"];
  let times = [1, 10, 20, 30, 45, 90];
  let actions = ["nap", "clean", "talk", "eat", "play", "scratch"];

  let addAction = (time) => {
    let action = {
      meow: meow[Math.floor(Math.random() * meow.length)],
      action: actions[Math.floor(Math.random() * actions.length)],
      time: time,
    };

    fullDay.day.push(action);
    fullDay.totalTime += time;
    fullDay.maxtime -= time;
  };

  // for loop

  // run a loop that assigns cat actions if that action does not exceed maxtime 1440
  while (fullDay.maxtime > 0) {
    // get random index
    let timeindex = Math.floor(Math.random() * times.length);
    // get time at index
    let time = times[timeindex];

    function checkTime(time, totaltime) {
      return time + totaltime > 1440;
    }
    //   after check time remove time if false

    if (!checkTime(time, fullDay.totalTime)) {
      addAction(time);
      console.log({
        fullDaymaxtime: fullDay.maxtime,
        fullDaytotaltime: fullDay.totalTime,
        time: time,
      });
    } else {
      times.splice(timeindex, times.length - timeindex);
    } // end of if statement
  } // end of for loop

  return fullDay;
} // end of cat actions

let cat = Generate();
console.log(catActions(cat));

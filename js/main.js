(function () {
  "use strict";

  let timer = document.getElementById("timer");
  let start = document.getElementById("start");
  let stop = document.getElementById("stop");
  let reset = document.getElementById("reset");

  let starttime;
  let elapsedtime = 0;
  let timerid;
  let timetoadd = 0;
  let isrunning = false;

  const updatetimertext = () => {
    // 135200 -> 02:15.200
    // m = 135200 / 60000 の商
    // s = 135200 % 60000 / 1000
    // ms = 135200 % 1000
    let m = Math.floor(elapsedtime / 60000);
    let s = Math.floor(elapsedtime % 60000 / 1000);
    let ms = elapsedtime % 1000;

    m = ("0" + m).slice(-2);
    s = ("0" + s).slice(-2);
    ms = ("00" + ms).slice(-3);

    timer.textContent = `${m}:${s}.${ms}`;
  };

  const countup = () => {
    timerid = setTimeout(function () {
      elapsedtime = Date.now() - starttime + timetoadd;
      updatetimertext();
      countup();
    },10);
  };

  const updatebuttonstate = (startbuttonstate,stopbuttonstate,resetbuttonstate) => {
    start.className = startbuttonstate ? "btn" : "btn inactive"
    stop.className = stopbuttonstate ? "btn" : "btn inactive"
    reset.className = resetbuttonstate ? "btn" : "btn inactive"
  } ;

  updatebuttonstate(true,false,false);

  start.className = "btn";
  stop.className = "btn inactive";
  reset.className = "btn inactive";

  start.addEventListener("click",function(){
    if (isrunning === true){
      return;
    }
    isrunning = true;
    updatebuttonstate(false,true,false);
    starttime = Date.now();
    countup();
  });

  stop.addEventListener("click",function(){
    if (isrunning === false){
      return;
    }
    isrunning = false;
    updatebuttonstate(true,false,true);
    clearTimeout(timerid);
    timetoadd += Date.now() - starttime;
  });

  reset.addEventListener("click",function(){
    if(isrunning === true){
      return;
    }
    updatebuttonstate(true,false,false);
    elapsedtime = 0;
    timetoadd = 0;
    updatetimertext();
  });
})();

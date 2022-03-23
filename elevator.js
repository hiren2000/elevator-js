const liftcallbtn = document.getElementById("liftcallbtn");
const startfloor = document.getElementById("startfloor");
const endfloor = document.getElementById("endfloor");
let callQueue = [];
let liftcall;
var liftFloor = 0; // lift's current floor
// console.log('current floor : ', liftFloor);

//================================================================================

let cnt = 0;
function up(pickupFloor, dropFloor) {

  for(let i = 0; i < callQueue.length; i++) {
    if(callQueue[i].direction > 0) {
      pickupFloor = Math.max(callQueue[i].pickup , pickupFloor);
      dropFloor = Math.min(callQueue[i].drop, dropFloor);
    }
  }

  if(liftFloor <= pickupFloor) {
    // console.log("going up, current floor : ", liftFloor);
    for (let i = 0; i < callQueue.length; i++) {
      if (liftFloor === callQueue[i].pickup && liftFloor < callQueue[i].drop) {
        console.log("🚪🚶 : ", liftFloor);
        callQueue[i].inLift = true;
        cnt++;
      }
      if(liftFloor === callQueue[i].drop && callQueue[i].inLift) {
        console.log("🚪🕺 : ", liftFloor);
        callQueue = callQueue.filter((ele) => {
          return ele != callQueue[i];
        });
        cnt--;
      }
    }
    console.log("🚪⬆️ : ", liftFloor);
    liftFloor++;
  }
  else if(cnt) {
    // console.log("lift is at floor number : ", liftFloor);
    for(let i = 0; i < callQueue.length; i++) {
      if(callQueue[i].inLift) {
        dropFloor = Math.max(callQueue[i].drop, dropFloor);
      }
    }
    if(liftFloor <= dropFloor) {
      // console.log("going up, current floor : ", liftFloor);
      for (let i = 0; i < callQueue.length; i++) {
        if (liftFloor === callQueue[i].pickup && liftFloor < callQueue[i].drop) {
          console.log("🚪🚶 : ", liftFloor);
          callQueue[i].inLift = true;
          cnt++;
        }
        if(liftFloor === callQueue[i].drop && callQueue[i].inLift) {
          console.log("🚪🕺 : ", liftFloor);
          callQueue = callQueue.filter((ele) => {
            return ele != callQueue[i];
          });
          cnt--;
        }
      }
      // if(liftFloor != dropFloor){
      //   liftFloor++;
      // }
      console.log("🚪⬆️ : ", liftFloor);
      liftFloor++;
    }
  }
  else {
    liftFloor--;
    // console.log("lift is at floor number : ", liftFloor);
    clearInterval(liftcall);
    if(callQueue.length) {
      callLift();
    }
  }
}

//================================================================================

function down(pickupFloor, dropFloor) {

  for(let i = 0; i < callQueue.length; i++) {
    if(callQueue[i].direction < 0) {
      pickupFloor = Math.min(callQueue[i].pickup , pickupFloor)
      dropFloor = Math.max(callQueue[i].drop, dropFloor);
    }
  }


  if(liftFloor >= pickupFloor) {
    // console.log("going down, current floor : ", liftFloor);
    for (let i = 0; i < callQueue.length; i++) {
      if (liftFloor === callQueue[i].pickup && liftFloor > callQueue[i].drop) {
        console.log("🚪🚶 : ", liftFloor);
        callQueue[i].inLift = true;
        cnt++;
      }
      else if(liftFloor === callQueue[i].drop && callQueue[i].inLift) {
        console.log("🚪🕺 : ", liftFloor);
        callQueue = callQueue.filter((ele) => {
          return ele != callQueue[i];
        });
        cnt--;
      }
    }
    console.log("🚪⬇️: ", liftFloor);
    liftFloor--;
  }
  else if(cnt) {
    // console.log("lift is at floor number : ", liftFloor);
    for(let i = 0; i < callQueue.length; i++) {
      if(callQueue[i].inLift) {
        dropFloor = Math.min(callQueue[i].drop, dropFloor);
      }
    }

    if(liftFloor >= dropFloor) {
      console.log("🚪⬇️: ", liftFloor);
      for (let i = 0; i < callQueue.length; i++) {
        if (liftFloor === callQueue[i].pickup && liftFloor > callQueue[i].drop) {
          console.log("🚪🚶 : ", liftFloor);
          callQueue[i].inLift = true;
          cnt++;
        }
        else if(liftFloor === callQueue[i].drop && callQueue[i].inLift) {
          console.log("🚪🕺 : ", liftFloor);
          callQueue = callQueue.filter((ele) => {
            return ele != callQueue[i];
          });
          cnt--;
        }
      }
      // if(liftFloor != dropFloor){
      //   liftFloor--;
      // }
      liftFloor--;
    }
  }
  else {
    liftFloor++;
    console.log("🚪 ", liftFloor);
    clearInterval(liftcall);
    if(callQueue.length) {
      callLift();
    }
  }
}

//================================================================================

function callLift() {
  let pickupFloor = callQueue[0].pickup ;
  let dropFloor = callQueue[0].drop ;
  let direction = pickupFloor - dropFloor;
  let liftDirection = liftFloor - pickupFloor;
  if(liftDirection < 0) {
    for(let i = 0; i < callQueue.length; i++) {
      if(direction > 0 && callQueue[i].direction > 0) {
        pickupFloor = Math.max(callQueue[i].pickup , pickupFloor)
        dropFloor = Math.min(callQueue[i].drop, dropFloor);
      }
    }
  }
  else if(liftDirection > 0) {
    for(let i = 0; i < callQueue.length; i++) {
      if(direction < 0 && callQueue[i].direction < 0) {
        pickupFloor = Math.min(callQueue[i].pickup , pickupFloor)
        dropFloor = Math.max(callQueue[i].drop, dropFloor);
      }
    }
  }

  if (liftFloor < pickupFloor) {
    // console.log("lift is down, coming up");
    liftcall = setInterval(() => {
      up(pickupFloor, dropFloor);
    }, 2000);
  }
  else if (liftFloor > pickupFloor) {
    // console.log("lift is up, coming down");
    liftcall = setInterval(() => {
      down(pickupFloor, dropFloor);
    }, 2000);
  }
  else {
    // console.log("lift is at the same floor");
    if(direction > 0) {
      liftcall = setInterval(() => {
        down(pickupFloor, dropFloor);
      }, 2000);
    }
    else {
      liftcall = setInterval(() => {
        up(pickupFloor, dropFloor);
      }, 2000);
    }
  }
}

//================================================================================

let liftTransaction = (pickupFloor, dropFloor) => {
  let direction = pickupFloor - dropFloor; 
  // direction = (pickupFloor - dropFloor) ? 'down' : 'up';

  if (isNaN(pickupFloor) || isNaN(dropFloor)) {
    console.log("Please enter number value");
  }
  else if (pickupFloor === dropFloor) {
    console.log("You are on the same floor...");
  }
  else if (pickupFloor > 15 || dropFloor > 15 || pickupFloor < -2 || dropFloor < -2) {
    console.log("Floor does not exist");
  }
  else if (callQueue.length === 0) {
    callQueue.push({
      pickup: pickupFloor,
      drop: dropFloor,
      inLift: false,
      direction: direction,
    });
    callLift();
  }
  else {
    callQueue.push({
      pickup: pickupFloor,
      drop: dropFloor,
      inLift: false,
      direction: direction,
    });
  }
  // console.log(callQueue);
};

liftcallbtn.onclick = () => {
  let pickupFloor = parseInt(startfloor.value);
  let dropFloor = parseInt(endfloor.value);
  liftTransaction(pickupFloor, dropFloor);
};

// liftTransaction(1, 13);
// liftTransaction(4, 8);
// liftTransaction(5, 1);
// liftTransaction(10, -2);
// liftTransaction(-2, 8);
// 1, 4, 8, 13, 10, 5, 1, -2, 8
const pre = {
  startingstack: 200,
  smallblind: 1,
  bigblind: 2,
  opensize: 12,
  callers: 1,
  pot: 0,
  flopremainingstack: 9999,
  flopspr: 9999
}

const flop = {
  sizeratio: .50,
  bet: 0,
  callers: 1,
  pot: 0,
  turnremainingstack: 9999,
  turnspr: 9999
}

const turn = {
  sizeratio: .50,
  betsize: 0,
  callers: 1,
  pot: 0,
  riverremainingstack: 9999,
  riverspr: 9999
}

const river = {
  sizeratio: .50,
  betsize: 0,
  callers: 1,
  pot: 0,
  endofhandremainingstack: 9999,
}

const updateinputs = () => {
  const updatearr = [...document.getElementsByClassName('input-data')];
  pre.startingstack = parseInt(updatearr[0].textContent);
  pre.smallblind = parseInt(updatearr[1].textContent);
  pre.bigblind = parseInt(updatearr[2].textContent);
  pre.opensize = parseInt(updatearr[3].textContent);
  pre.callers = parseInt(updatearr[4].textContent);
  flop.sizeratio = parseFloat(updatearr[5].textContent);
  flop.callers = parseInt(updatearr[6].textContent);
  turn.sizeratio = parseFloat(updatearr[7].textContent);
  turn.callers = parseInt(updatearr[8].textContent);
  river.sizeratio = parseFloat(updatearr[9].textContent);
  river.callers = parseInt(updatearr[10].textContent);
}

const calcpre = () => {
  calculate.style.webkitAnimationPlayState = "paused";
  calculate.classList.remove('calculate-buttons');
  calculate.classList.add('calculate-buttons-no-animation');
  calculate.textContent = "Recalculate";
  updateinputs();
  if (pre.opensize <= pre.startingstack) {
    pre.pot = (pre.opensize * (pre.callers + 1)) + pre.smallblind + pre.bigblind;
    pre.flopremainingstack = pre.startingstack - pre.opensize;
    pre.flopspr = pre.flopremainingstack / pre.pot;
  } else {
    pre.opensize = pre.startingstack;
    pre.pot = (pre.opensize * (pre.callers + 1)) + pre.smallblind + pre.bigblind;
    pre.flopremainingstack = pre.startingstack - pre.opensize;
    pre.flopspr = pre.flopremainingstack / pre.pot;
  }
  fillvaluespre();
  calcflop();
}

const fillvaluespre = () => {
  document.getElementById('preflopbetdata').textContent = `${pre.opensize}`
  document.getElementById('prepotdata').textContent = `${pre.pot}`;
  document.getElementById('flopremainingstackdata').textContent = `${pre.flopremainingstack}`;
  if (pre.flopspr === 0) {
    document.getElementById('flopsprdata').textContent = 'All In';
  } else {
    document.getElementById('flopsprdata').textContent = `${pre.flopspr.toFixed(2)}`;
  }
}

const calcflop = () => {
  if (pre.flopremainingstack > 0) {
    if (Math.round(pre.pot * flop.sizeratio) <= pre.flopremainingstack) {
      flop.betsize = Math.round(pre.pot * flop.sizeratio);
      flop.pot = (flop.betsize * (flop.callers + 1)) + pre.pot;
      flop.turnremainingstack = pre.flopremainingstack - flop.betsize;
      flop.turnspr = flop.turnremainingstack / flop.pot;
    } else {
      flop.betsize = pre.flopremainingstack;
      flop.pot = (flop.betsize * (flop.callers + 1)) + pre.pot;
      flop.turnremainingstack = pre.flopremainingstack - flop.betsize;
      flop.turnspr = flop.turnremainingstack / flop.pot;
    }
  } else {
    flop.betsize = pre.flopremainingstack;
    flop.pot = (flop.betsize * (flop.callers + 1)) + pre.pot;
    flop.turnremainingstack = pre.flopremainingstack - flop.betsize;
    flop.turnspr = flop.turnremainingstack / flop.pot;
  }
  fillvaluesflop();
  calcturn();
}

const fillvaluesflop = () => {
  document.getElementById('flopbetdata').textContent = `${flop.betsize}`
  document.getElementById('floppotdata').textContent = `${flop.pot}`;
  document.getElementById('turnremainingstackdata').textContent = `${flop.turnremainingstack}`;
  if (flop.turnspr === 0) {
    document.getElementById('turnsprdata').textContent = 'All In';
  } else {
    document.getElementById('turnsprdata').textContent = `${flop.turnspr.toFixed(2)}`;
  }
}

const calcturn = () => {
  if (flop.turnremainingstack > 0) {
    if (Math.round(flop.pot * turn.sizeratio) <= flop.turnremainingstack) {
      turn.betsize = Math.round(flop.pot * turn.sizeratio);
      turn.pot = (turn.betsize * (turn.callers + 1)) + flop.pot;
      turn.riverremainingstack = flop.turnremainingstack - turn.betsize;
      turn.riverspr = turn.riverremainingstack / turn.pot;
    } else {
      turn.betsize = flop.turnremainingstack;
      turn.pot = (turn.betsize * (turn.callers + 1)) + flop.pot;
      turn.riverremainingstack = flop.turnremainingstack - turn.betsize;
      turn.riverspr = turn.riverremainingstack / turn.pot;
    }
  } else {
    turn.betsize = flop.turnremainingstack;
    turn.pot = (turn.betsize * (turn.callers + 1)) + flop.pot;
    turn.riverremainingstack = flop.turnremainingstack - turn.betsize;
    turn.riverspr = turn.riverremainingstack / turn.pot;
  }
  fillvaluesturn()
  calcriver();
}

const fillvaluesturn = () => {
  document.getElementById('turnbetdata').textContent = `${turn.betsize}`;
  document.getElementById('turnpotdata').textContent = `${turn.pot}`;
  document.getElementById('riverremainingstackdata').textContent = `${turn.riverremainingstack}`;
  if (turn.riverspr === 0) {
    document.getElementById('riversprdata').textContent = 'All In';
  } else {
    document.getElementById('riversprdata').textContent = `${turn.riverspr.toFixed(2)}`;
  }
}

const calcriver = () => {
  if (turn.riverremainingstack > 0) {
    if (Math.round(turn.pot * river.sizeratio) <= turn.riverremainingstack) {
      river.betsize = Math.round(turn.pot * river.sizeratio);
      river.pot = (river.betsize * (river.callers + 1)) + turn.pot;
      river.endofremainingstack = turn.riverremainingstack - river.betsize;
    } else {
      river.betsize = turn.riverremainingstack;
      river.pot = (river.betsize * (river.callers + 1)) + turn.pot;
      river.endofremainingstack = turn.riverremainingstack - river.betsize;
    }
  } else {
    river.betsize = turn.riverremainingstack;
    river.pot = (river.betsize * (river.callers + 1)) + turn.pot;
    river.endofremainingstack = turn.riverremainingstack - river.betsize;
  }
  fillvaluesriver();
}

const fillvaluesriver = () => {
  document.getElementById('riverbetdata').textContent = `${river.betsize}`;
  document.getElementById('riverpotdata').textContent = `${river.pot}`;
  document.getElementById('endofhandstackdata').textContent = `${river.endofremainingstack}`;
}

const updatestartingstack = () => {
  const myel = document.getElementById('stackinput');
  pre.startingstack = parseInt(myel.value);
  document.getElementById('effectivestartingstackdata').textContent = `${pre.startingstack}`;
  off();
}

const calculate = document.getElementsByClassName('calculate-buttons')[0];
calculate.addEventListener('click', calcpre);


function on(int) {
  document.getElementsByClassName('modal')[int].style.display = "block";
}

function off(int) {
  document.getElementsByClassName('modal')[int].style.display = "none";
}

const changebuttons = [...document.getElementsByClassName('change-buttons')];
changebuttons.forEach((button, idx) => {
  button.addEventListener('click', () => on(idx));
})

const closebuttons = [...document.getElementsByClassName('close')];
closebuttons.forEach((button, idx) => {
  button.addEventListener('click', () => off(idx))
});

const modalinputs = [...document.getElementsByClassName('modal-input')];
const inputdata = [...document.getElementsByClassName('input-data')];

const submitbuttons = [...document.getElementsByClassName('submit')];
submitbuttons.forEach((button, idx) => {
  button.addEventListener('click', () => {
    inputdata[idx].textContent = modalinputs[idx].value;
    off(idx);
    calcpre();
  });
})
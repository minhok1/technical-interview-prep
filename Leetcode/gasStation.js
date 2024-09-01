var canCompleteCircuit = function (gas, cost) {
  let tank = 0;
  currentTank = 0;
  startingStation = 0;
  for (let i = 0; i < gas.length; i++) {
    tank += gas[i] - cost[i];
    currentTank += gas[i] - cost[i];
    if (currentTank < 0) {
      startingStation = i + 1;
      currentTank = 0;
    }
  }

  return tank < 0 ? -1 : startingStation;
};

var RandomizedSet = function () {
  this.container = new Set();
};

/**
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.insert = function (val) {
  if (!this.container.has(val)) {
    this.container.add(val);
    return true;
  } else {
    return false;
  }
};

/**
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.remove = function (val) {
  if (this.container.has(val)) {
    this.container.delete(val);
    return true;
  } else {
    return false;
  }
};

/**
 * @return {number}
 */
RandomizedSet.prototype.getRandom = function () {
  let index = Math.floor(Math.random() * this.container.size);
  const arr = [...this.container];
  return arr[index];
};

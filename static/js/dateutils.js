Date.prototype.toYMD = function () {
  return this.toISOString().split('T')[0];
};

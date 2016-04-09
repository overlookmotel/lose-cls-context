// --------------------
// lose-cls-context module
// --------------------

// init queue
var queue = [];

// runs fns in queue
function clearQueue() {
    // get item at front of queue and call fn
    var fn = queue.shift();
    if (fn) fn();

    // run again on next tick
    clearQueueLater();
}

// schedules running fns in queue on next tick
function clearQueueLater() {
    setImmediate(clearQueue);
}

// start running queue
clearQueueLater();

// add fn to queue
module.exports = function(fn) {
    if (!fn || typeof fn != 'function') throw new Error('fn must be a function');

    queue.push(fn.bind(this));
};

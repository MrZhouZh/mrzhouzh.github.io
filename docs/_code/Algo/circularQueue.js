/**
 * @param {number} k
 */
var MyCircularQueue = function(k) {
  this.k = k + 1
  this.list = []
  this.front = 0
  this.rear = 0
};

/** 
* @param {number} value
* @return {boolean}
*/
MyCircularQueue.prototype.enQueue = function(value) {
  if (this.isFull()) return false
  this.list[this.rear] = value
  this.rear = (this.rear + 1) % this.k
  return true
};

/**
* @return {boolean}
*/
MyCircularQueue.prototype.deQueue = function() {
  if (this.isEmpty()) return false
  // 不能超出
  this.front = (this.front + 1) % this.k
  return true
};

/**
* @return {number}
*/
MyCircularQueue.prototype.Front = function() {
  return this.list[this.front] || -1
};

/**
* @return {number}
*/
MyCircularQueue.prototype.Rear = function() {
  return this.list[(this.rear - 1 + this.k) % this.k] || -1
};

/**
* @return {boolean}
*/
MyCircularQueue.prototype.isEmpty = function() {
  return this.front === this.rear
};

/**
* @return {boolean}
*/
MyCircularQueue.prototype.isFull = function() {
  return (this.rear + 1) % this.k === this.front
};

circularQueue = new MyCircularQueue(3); // 设置长度为 3

console.log(
  circularQueue.enQueue(1), // 返回 true
  circularQueue.enQueue(2), // 返回 true
  circularQueue.enQueue(3), // 返回 true
  circularQueue.enQueue(4), // 返回 false，队列已满
  circularQueue.Rear(), // 返回 3
  circularQueue.isFull(), // 返回 true
  circularQueue.deQueue(), // 返回 true
  circularQueue.enQueue(4), // 返回 true
  circularQueue.Rear(), // 返回 4
);


class EventEmitter {
  constructor() {
    this.publishers = {};
  }
  on(eventType, cb) {
    if (this.publishers[eventType]) {
      this.publishers[eventType].subers.push(cb);
    } else {
      this.publishers[eventType] = { subers: [cb] };
      // this.publishers[eventType].subers = [cb];
    }
  }
  emit(eventType, ...values) {
    let puber = this.publishers[eventType];
    if (!puber) {
      return;
    }
    var that = this;
    puber.subers.forEach(function(sub) {
      sub.apply(that, values);
    });
  }
}

const e = new EventEmitter();
e.on("update", function(data) {
  console.log(data);
});
e.emit("update", "message");
e.emit("update", "haha");

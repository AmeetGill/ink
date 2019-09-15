let data = {};

let storeEvent = (id, event) => {
  let eventData = {};
  if (data && data.id) {
    eventData = data.id;
  } else {
    eventData.id = {
      maxCount: {
        click: 0
      },
      list: []
    };
  }

  let maxEventCount = eventData.Count;
  let eventList = eventData.list;

  let eventToUnbind =
    eventList.length === maxEventCount ? eventList.shift() : undefined;

  eventList.push(event);

  if (eventToUnbind) {
    unbindEvent(id, eventToUnbind);
  }
};

let bindEventToDom = (id, event) => {
  let elem = document.getElementById(id);
  if (!elem) throw Error("No element with given id exist");

  let eventListener = elem.addEventListener(event.type, event.function);

  storeEvent(id, eventListener);
};

let unbindEvent = (id, event) => {
  let elem = document.getElementById(id);

  elem.removeEventListener(event.type, event.listener);
};

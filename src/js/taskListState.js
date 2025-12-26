export default class TaskListState {
  constructor() {
    this.arrayTask = [];
    this.arrayPinnedTask = [];
  }

  // static from(object) {
  //   // TODO: create object
  //   if (typeof object === "object") {
  //     return object;
  //   }
  //   return null;
  // }

  static from(object) {
    if (typeof object === "object" && object !== null) {
      const instance = new TaskListState();
      instance.arrayTask = object.arrayTask || [];
      instance.arrayPinnedTask = object.arrayPinnedTask || []
      return instance;
    }
    return new TaskListState(); // Возвращаем новый экземпляр, если объект некорректен
  } 

}

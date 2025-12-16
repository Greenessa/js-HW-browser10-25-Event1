export default class TaskListState {
  constructor() {
    this.arrayTask = [];
    this.arrayPinnedTask = [];
  }

  static from(object) {
    // TODO: create object
    if (typeof object === "object") {
      return object;
    }
    return null;
  }
}

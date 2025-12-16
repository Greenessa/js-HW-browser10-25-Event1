// TODO: write code here
import createTaskList from "./createTaskList";
import saveInStorage from "./saveInStorage";

// comment this to pass build
// const unusedVariable = "variable";

// for demonstration purpose only
export default function demo(value) {
  return `Demo: ${value}`;
}

console.log("app.js included");

const save = new saveInStorage(localStorage);

let taskList = new createTaskList(save);

taskList.loadTaskList();

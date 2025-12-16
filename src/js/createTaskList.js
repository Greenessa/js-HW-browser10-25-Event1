import TaskListState from "./taskListState";

export default class createTaskList {
  constructor(storage) {
    this.saveInStorage = storage;
    this.inputFilterEl = document.querySelector(".input");
    this.pinnedTaskEl = document.querySelector(".pinned-task-list");
    this.allTaskEl = document.querySelector(".all-task-list");
    this.taskListState = new TaskListState();
    this.filterArray = [];
    this.saveTask = this.saveTask.bind(this);
    this.pinTask = this.pinTask.bind(this);
    this.pinOffTasks = this.pinOffTasks.bind(this);
    this.filterTask = this.filterTask.bind(this);
    this.loadTaskList = this.loadTaskList.bind(this);
    this.inputFilterEl.addEventListener("keypress", this.saveTask);
    this.inputFilterEl.addEventListener("input", this.filterTask);
    this.allTaskEl.addEventListener("click", this.pinTask);
    this.pinnedTaskEl.addEventListener("click", this.pinOffTasks);
  }

  loadTaskList() {
    let obj = this.saveInStorage.getFromStorage();
    // console.log(obj);
    this.taskListState = TaskListState.from(obj);
    console.log("Загруженный список задач", this.taskListState);
    if (this.taskListState != null) {
      this.addTasks(this.taskListState.arrayTask);
      this.addPinnedTasks(this.taskListState.arrayPinnedTask);
    }
  }

  removeTask() {
    let taskOldEl = document.querySelector(".task-list");
    if (taskOldEl) {
      taskOldEl.remove();
    }
  }

  filterTask() {
    if (this.inputFilterEl.value == null) {
      this.removeTask();
      this.addTasks(this.taskListState.arrayTask);
    } else {
      this.filterArray = this.taskListState.arrayTask.filter((item) =>
        item.startsWith(this.inputFilterEl.value.toLowerCase()),
      );
      if (this.filterArray.length != 0) {
        this.removeTask();
        this.addTasks(this.filterArray);
      } else {
        this.removeTask();
        let noEl = document.querySelector(".no_task");
        if (noEl) {
          noEl.remove();
        }
        let hEl = document.createElement("h4");
        hEl.classList.add("no_task");
        hEl.textContent = "No tasks found";
        this.allTaskEl.append(hEl);
      }
    }
  }

  saveTask(event) {
    if (event.code === "Enter") {
      event.preventDefault();
      // console.log('что в инпуте сейчас',(this.inputFilterEl.value===''));
      this.inputFilterEl.removeAttribute("placeholder");
      if (this.inputFilterEl.value != "") {
        if (
          !this.taskListState.arrayTask.includes(
            this.inputFilterEl.value.toLowerCase(),
          )
        ) {
          this.taskListState.arrayTask.push(
            this.inputFilterEl.value.toLowerCase(),
          );
          this.addTasks(this.taskListState.arrayTask);
          // console.log('Массив текущий', this.taskListState.arrayTask);
          // console.log('Массив текущий', this.taskListState);
          this.saveInStorage.setInStorage(this.taskListState);
        }
        this.inputFilterEl.value = null;
      } else {
        this.inputFilterEl.setAttribute(
          "placeholder",
          "Ошибка! Вы не ввели задачу!",
        );
      }
    }
  }

  addTasks(array) {
    let noEl = document.querySelector(".no_task");
    if (noEl) {
      noEl.remove();
    }
    this.removeTask();
    let taskNewEl = document.createElement("ul");
    taskNewEl.classList.add("task-list");
    for (const task of array) {
      let taskEl = document.createElement("li");
      taskEl.classList.add("task");
      let labelEl = document.createElement("label");
      labelEl.classList.add("task-choice");
      labelEl.setAttribute("for", "alltask");
      labelEl.textContent = task;
      let checkboxEl = document.createElement("input");
      checkboxEl.classList.add("round-checkbox");
      checkboxEl.setAttribute("id", "alltask");
      checkboxEl.setAttribute("type", "checkbox");
      taskEl.append(labelEl, checkboxEl);
      taskNewEl.append(taskEl);
    }
    this.allTaskEl.append(taskNewEl);
  }

  pinTask(event) {
    event.preventDefault();
    let selectedEl = event.target;
    if (selectedEl.classList.contains("round-checkbox")) {
      let task = selectedEl.previousElementSibling.textContent;
      this.taskListState.arrayPinnedTask.push(task);
      this.addPinnedTasks(this.taskListState.arrayPinnedTask);
      let index = this.taskListState.arrayTask.indexOf(task);
      this.taskListState.arrayTask.splice(index, 1);
      this.addTasks(this.taskListState.arrayTask);
      this.saveInStorage.setInStorage(this.taskListState);
    }
  }

  addPinnedTasks(array) {
    let pinnedEls = this.pinnedTaskEl.querySelectorAll("li");
    if (pinnedEls) {
      for (const taskEl of pinnedEls) {
        taskEl.remove();
      }
    }
    for (const task of array) {
      let taskEl = document.createElement("li");
      taskEl.classList.add("pinnedtask");
      let labelEl = document.createElement("label");
      labelEl.classList.add("pinOff");
      labelEl.setAttribute("for", "pinned");
      labelEl.textContent = task;
      let checkboxEl = document.createElement("input");
      checkboxEl.classList.add("round-checkbox");
      checkboxEl.setAttribute("id", "pinned");
      checkboxEl.setAttribute("type", "checkbox");
      taskEl.append(labelEl, checkboxEl);
      this.pinnedTaskEl.append(taskEl);
    }
  }

  pinOffTasks(event) {
    event.preventDefault();
    let selectedEl = event.target;
    if (selectedEl.classList.contains("round-checkbox")) {
      let task = selectedEl.previousElementSibling.textContent;
      this.taskListState.arrayTask.push(task);
      this.addTasks(this.arrayTask);
      let index = this.taskListState.arrayPinnedTask.indexOf(task);
      this.taskListState.arrayPinnedTask.splice(index, 1);
      this.addPinnedTasks(this.taskListState.arrayPinnedTask);
      this.saveInStorage.setInStorage(this.taskListState);
      if (this.taskListState.arrayPinnedTask.length === 0) {
        let hEl = document.createElement("h4");
        hEl.textContent = "No pinned tasks";
        this.pinnedTaskEl.append(hEl);
      }
    }
  }
}

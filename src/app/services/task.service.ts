import { Injectable } from '@angular/core'
import { Task } from '../models/task.model'

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: Task[] = []

  constructor() {
    this.loadTasksLocal()
  }

  getTasks(): Task[] {
    return this.tasks
  }

  addTask(title: string): void {
    const newTask: Task = {
      id: Date.now(),
      title,
      completed: false,
    }
    this.tasks.push(newTask)
    this.saveTasksLocal()
  }

  updateTask(id: number): void {
    const task = this.tasks.find((task) => task.id === id)
    if (task) {
      task.completed = !task.completed
      this.saveTasksLocal()
    }
  }

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter((task) => task.id !== id)
    this.saveTasksLocal()
  }

  private saveTasksLocal(): void {
    localStorage.setItem('tasks', JSON.stringify(this.tasks))
  }


  private loadTasksLocal(): void {
    const storedTasks = localStorage.getItem('tasks')
    this.tasks = storedTasks ? JSON.parse(storedTasks) : []
  }
}

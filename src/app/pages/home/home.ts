import { Component, OnInit, OnDestroy, signal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { TaskService } from '../../services/task.service'
import { Task } from '../../models/task.model'

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class HomePage implements OnInit, OnDestroy {
  newTask = ''
  tasks = signal<Task[]>([])
  currentTime = signal<Date>(new Date())
  private timer?: ReturnType<typeof setInterval>

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadTasks()
    this.timer = setInterval(() => {
      this.currentTime.set(new Date())
    }, 1000)
  }

  ngOnDestroy() {
    clearInterval(this.timer)
  }

  getGreeting(): string {
    const hour = this.currentTime().getHours()
    if (hour < 12) return '☀️ Buenos días'
    if (hour < 20) return '🌇 Buenas tardes'
    return '🌙 Buenas noches'
  }

  loadTasks() {
    this.tasks.set(this.taskService.getTasks())
  }

  addTask() {
    const trimmed = this.newTask.trim()
    if (!trimmed) return
    this.taskService.addTask(trimmed)
    this.newTask = ''
    this.loadTasks()
  }

  toggleTask(id: number) {
    this.taskService.updateTask(id)
    this.loadTasks()
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id)
    this.loadTasks()
  }
}

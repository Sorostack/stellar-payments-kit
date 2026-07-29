export interface ScheduledTask {
  id: string;
  name: string;
  intervalMs: number;
  lastRun: number | null;
  nextRun: number;
  run: () => Promise<void>;
}

export class TaskScheduler {
  private tasks: Map<string, ScheduledTask> = new Map();
  private timers: Map<string, ReturnType<typeof setInterval>> = new Map();

  add(task: ScheduledTask): void {
    this.tasks.set(task.id, task);
  }

  remove(id: string): void {
    this.stop(id);
    this.tasks.delete(id);
  }

  start(id: string): void {
    const task = this.tasks.get(id);
    if (!task) throw new Error(`Task ${id} not found`);
    if (this.timers.has(id)) return;

    const timer = setInterval(async () => {
      try {
        await task.run();
        task.lastRun = Date.now();
        task.nextRun = Date.now() + task.intervalMs;
      } catch (error) {
        console.error(`Task ${task.name} failed:`, error);
      }
    }, task.intervalMs);

    this.timers.set(id, timer);
  }

  stop(id: string): void {
    const timer = this.timers.get(id);
    if (timer) {
      clearInterval(timer);
      this.timers.delete(id);
    }
  }

  startAll(): void {
    for (const id of this.tasks.keys()) {
      this.start(id);
    }
  }

  stopAll(): void {
    for (const id of this.timers.keys()) {
      this.stop(id);
    }
  }
}

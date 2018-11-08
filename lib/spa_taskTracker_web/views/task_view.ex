defmodule SpaTaskTrackerWeb.TaskView do
  use SpaTaskTrackerWeb, :view
  alias SpaTaskTrackerWeb.TaskView

  def render("index.json", %{tasks: tasks}) do
    %{data: render_many(tasks, TaskView, "task.json")}
  end

  def render("show.json", %{task: task}) do
    %{data: render_one(task, TaskView, "task.json")}
  end

  def render("task.json", %{task: task}) do
    %{id: task.id,
      title: task.title,
      description: task.description,
      completed: task.completed,
      duration: task.duration,
      user_id: task.user_id,}
  end
end

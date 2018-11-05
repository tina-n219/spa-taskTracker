defmodule SpaTaskTracker.Repo.Migrations.CreateTasks do
  use Ecto.Migration

  def change do
    create table(:tasks) do
      add :title, :string
      add :description, :text
      add :completed, :boolean, default: false, null: false
      add :duration, :integer
      add :assignedTo, references(:users, on_delete: :nothing)

      timestamps()
    end

    create index(:tasks, [:assignedTo])
  end
end

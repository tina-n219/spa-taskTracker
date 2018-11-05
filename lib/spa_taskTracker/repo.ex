defmodule SpaTaskTracker.Repo do
  use Ecto.Repo,
    otp_app: :spa_taskTracker,
    adapter: Ecto.Adapters.Postgres
end

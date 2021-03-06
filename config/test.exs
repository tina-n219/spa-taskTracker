use Mix.Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :spa_taskTracker, SpaTaskTrackerWeb.Endpoint,
  http: [port: 4001],
  server: false

# Print only warnings and errors during test
config :logger, level: :warn

# Configure your database
config :spa_taskTracker, SpaTaskTracker.Repo,
  username: "taskTracker_spa",
  password: "tinapass415",
  database: "spa_tasktracker_test",
  hostname: "localhost",
  pool: Ecto.Adapters.SQL.Sandbox

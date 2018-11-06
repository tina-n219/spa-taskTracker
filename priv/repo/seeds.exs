# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     SpaTaskTracker.Repo.insert!(%SpaTaskTracker.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.
alias SpaTaskTracker.Repo
alias SpaTaskTracker.Users.User
alias SpaTaskTracker.Tasks.Task

pwhash = Argon2.hash_pwd_salt("pass1")

Repo.insert!(%User{email: "alice@example.com", password_hash: pwhash})
Repo.insert!(%Task{title: "spa", description: "blah", user_id: 1})
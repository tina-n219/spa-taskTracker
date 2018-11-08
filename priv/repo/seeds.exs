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
pwhash2 = Argon2.hash_pwd_salt("pass2")
pwhash3 = Argon2.hash_pwd_salt("tinapass415")

Repo.insert!(%User{email: "alice@example.com", password_hash: pwhash})
Repo.insert!(%User{email: "bob@example.com", password_hash: pwhash2})
Repo.insert!(%User{email: "tina@example.com", password_hash: pwhash3})

Repo.insert!(%Task{title: "Complete Web Dev SPA", description: "Create a single page application, this will entail a lot of stuff i don't know", duration: 1500, completed: false, user_id: 3})
Repo.insert!(%Task{title: "Typography Book", description: "Make spreads for the entire book!", duration: 200, completed: false, user_id: 3})

defmodule SpaTaskTrackerWeb.SessionController do
    use SpaTaskTrackerWeb, :controller
  
    action_fallback SpaTaskTrackerWeb.FallbackController
  
    alias SpaTaskTracker.Users.User
  
    def create(conn, %{"email" => email, "password" => password}) do

      with %User{} = user <- SpaTaskTracker.Users.get_and_auth_user(email, password) do
        resp = %{
          data: %{
            token: Phoenix.Token.sign(SpaTaskTrackerWeb.Endpoint, "user_id", user.id),
            user_id: user.id,
          }
        }
  
        conn
        |> put_resp_header("content-type", "application/json; charset=UTF-8")
        |> send_resp(:created, Jason.encode!(resp))
      end
    end
  end
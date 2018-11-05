defmodule SpaTaskTrackerWeb.PageController do
  use SpaTaskTrackerWeb, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end

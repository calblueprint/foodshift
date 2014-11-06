module ApplicationHelper
  def active?(link_path)
    current_page?(link_path) ? "active" : ""
  end
end

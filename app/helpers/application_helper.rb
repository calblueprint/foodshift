module ApplicationHelper
  def active?(link_path)
    current_page?(link_path) ? "active" : ""
  end

  def flash_toastr_msgs
    flash_messages = {}
    flash.each do |type, message|
      type = "success" if type == "notice"
      type = "error"   if type == "alert"
      flash_messages[type] = message if message
    end
    flash_messages
  end
end

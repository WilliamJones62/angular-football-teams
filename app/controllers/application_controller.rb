class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def set_access_control_headers
    headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
  end
  
  def index
  end

end

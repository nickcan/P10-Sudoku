helpers do

  def current_user
    if session[:user_id]
      @user ||= User.find(session[:user_id])
    end
  end

  def logged_in?
    !current_user.nil?
  end

  # def create_user
  #   @user = User.new(params)
  #   @user.password_hash = params[:password]
  #   @user.save!
  # end

  def login
    @user = User.find_by(username: params[:username])
    if @user.password_hash == params[:password]
      session[:user_id] = @user.id
    end
  end
end
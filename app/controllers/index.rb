require 'unirest'
enable :sessions

get '/' do
  erb :index
end

get '/users' do
  content_type :json
  {users: (User.all)}.to_json
end

post '/users' do
  user = User.create(username: params[:username], password_hash: params[:password])
  session[:user_id] = user.id
  redirect '/'
end

post '/users/:id' do
  login
  redirect '/'
end

get '/signout' do
  session[:user_id] = nil
  redirect '/'
end

# request to Sudoku API for new board
get '/board/new' do
  server_response = Unirest.get "https://sudokuchicken-sudoku-generator-solver.p.mashape.com/generate.php", headers:{"X-Mashape-Key" => "WSrIx5taMemshnDPKmXe3Osl64gep1rUmIdjsnO6S0RzjIaYNP"}
  @puzzle = server_response.body["puzzle"]
  current_user.updateNewGame(@puzzle)
  content_type :json
  @puzzle.to_json
end

# request to Sudoku API for solved board
post '/board/solution' do
  puzzle = params[:board]
  server_response = Unirest.get "https://sudokuchicken-sudoku-generator-solver.p.mashape.com/solve.php?p=#{puzzle}", headers:{"X-Mashape-Key" => "WSrIx5taMemshnDPKmXe3Osl64gep1rUmIdjsnO6S0RzjIaYNP"}
  solution = server_response.body["solution"]
end

put '/win' do
  current_user.games.last.update_attributes(solved_board: params[:board])
  current_user.updateWins(params[:board])
end

get '/profile' do
  content_type :json
  current_user.to_json
end
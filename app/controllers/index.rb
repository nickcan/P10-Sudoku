require 'unirest'
enable :sessions

get '/' do
  erb :index
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
  server_data = Unirest.get "https://sudokuchicken-sudoku-generator-solver.p.mashape.com/generate.php", headers:{"X-Mashape-Key" => "WSrIx5taMemshnDPKmXe3Osl64gep1rUmIdjsnO6S0RzjIaYNP"}
  @puzzle = server_data.body["puzzle"]
  current_user.games.create(unsolved_board: @puzzle)
  # erb :_board, layout: false
  content_type :json
  @puzzle.to_json
end

# request to Sudoku API for solved board
post '/board/solution' do
  puzzle = params[:board]
  server_data = Unirest.get "https://sudokuchicken-sudoku-generator-solver.p.mashape.com/solve.php?p=#{puzzle}", headers:{"X-Mashape-Key" => "WSrIx5taMemshnDPKmXe3Osl64gep1rUmIdjsnO6S0RzjIaYNP"}
  solution = server_data.body["solution"]
end
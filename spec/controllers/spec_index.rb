require 'spec_helper'

User.destroy_all
describe 'GET /' do
  it 'Responds with a browser code of 200' do
    get '/'
    expect(last_response.status).to eq(200)
  end
end

describe 'POST /users' do
  it 'Creates a new user' do
    fake_params = {username: 'apple', password: 1234567}
    before = User.count
    post '/users', fake_params
    expect(User.count).to eq(before + 1)
  end

  it 'Does not create a new user if the username is not unique' do
    fake_params = {username: 'paul', password: 1234567}
    User.create(username: 'paul', password_hash: 1234567)
    before = User.count
    post '/users', fake_params
    expect(User.count).to eq(before)
  end
end

describe 'POST /games' do
  # it 'Creates a new Game for a particular User'
end
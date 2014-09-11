class User < ActiveRecord::Base
  has_many :games
  validates_length_of :password_hash, minimum: 6
  validates_uniqueness_of :username

  def updateNewGame(puzzle)
    self.attempts += 1
    self.games.create(unsolved_board: puzzle)
    self.save!
    self.reload
  end

  def updateWins(board)
    self.wins += 1
    self.save!
    self.reload
  end

  # include BCrypt

  # def password
  #   @password ||= Password.new(password_hash)
  # end

  # def password=(new_password)
  #   @password = Password.create(new_password)
  #   self.password_hash = @password
  # end
end

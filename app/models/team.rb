class Team < ActiveRecord::Base
  has_many :players, inverse_of: :team, :dependent => :destroy
  accepts_nested_attributes_for :players
  validates :name, presence: true, uniqueness: true
  validates :league, presence: true

 end

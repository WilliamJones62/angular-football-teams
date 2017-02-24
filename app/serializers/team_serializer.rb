class TeamSerializer < ActiveModel::Serializer
  attributes :id, :name, :league
  has_many :players
end

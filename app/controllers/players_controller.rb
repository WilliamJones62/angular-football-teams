class PlayersController < ApplicationController

  before_action :set_team

  def player_data
    player = Player.find(params[:id])
    render json: player.to_json
  end

  def create
    @player = @team.players.build(players_params)
    if @player.save
      render :json => @player
    else
      render json: { errors: "Error creating player, please try again."}
    end
  end

  def index
    @players = @team.players
    render :json => @players
  end

  def show
    @player = Player.find(params[:id])
    if @player
      render json: @player
    else
      render json: { errors: "This is not a player, please try again."}
    end
  end

  def update
    @player = Player.find(params[:id])
    if @player.update(players_params)
      render nothing: true
    else
      render json: { errors: "Error updating player, please try again."}
    end
  end

  def destroy
    @player = Player.find(params[:id])
    if @player.destroy
      render nothing: true
    else
      render json: { errors: "Error deleting player, please try again"}
    end
  end

  def data
    player = Player.find(params[:id])
    render json: player.to_json(only: [:name, :id])
  end

  private
    def set_team
      @team = Team.find(params[:team_id])
    end

    def players_params
      params.require(:player).permit(:name)
    end

end

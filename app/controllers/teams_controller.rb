class TeamsController < ApplicationController

  before_action :set_team, only: [ :show, :update, :destroy]

  def index
    @teams = Team.all
    render :json => @teams
  end

  def create
    @team = Team.new(team_params)
    if @team.save
      render :json => @team
    else
      render json: { errors: "Error creating team, please try again."}
    end
  end

  def show
    if @team
      render json: @team
    else
      render json: { errors: "This is not a team, please try again."}
    end
  end

  def update
    if @team.update(team_params)
      render nothing: true
    else
      render json: { errors: "Error updating team, please try again."}
    end
  end

  def destroy
    if @team.destroy
      render nothing: true
    else
      render json: { errors: "Error deleting team, please try again"}
    end
  end

private
    def team_params
      params.require(:team).permit(
        :name, :league,
        players_attributes: [
          :id,
          :name
        ],
      )
    end

    def set_team
      @team = Team.find(params[:id])
    end

end

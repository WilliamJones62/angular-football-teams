class TeamsController < ApplicationController

  def index
    @teams = Team.all
    render :json => @teams
  end

  def new
    @team = Team.new
    @players = @team.players
    13.times { @team.players.build }
    46.times { @team.games.build }
  end

  def edit
    @players = @team.players
  end

  def create
    @team = Team.new(team_params)
    @team.user_id = current_user.id
    respond_to do |format|
      if @team.save
        format.html { redirect_to @team, notice: 'Team was successfully created.' }
      else
        format.html {
          flash[:error] = @team.errors.full_messages.first
          render :new
        }
      end
    end
  end

  def show
    @team = Team.find(params[:id])
    if @team.players.last.try(:name)
      @team.players.build
      @most_played = @team.player_with_most_games
      @best_player = @team.best_player
    end
    if @team.games.last.try(:date)
      @team.games.build
    end
  end

  def update
    respond_to do |format|
      if @team.update(team_params)
        format.html { redirect_to @team, notice: 'Team was successfully updated.' }
      else
        format.html {
          flash[:error] = @team.errors.full_messages.first
          render :edit
        }
      end
    end
  end

  def destroy
    @team.destroy
    respond_to do |format|
      format.html { redirect_to teams_url, notice: 'Team was successfully destroyed.' }
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
        games_attributes: [
          :id,
          :date,
          :opponent,
          :score_for,
          :score_against,
          :home_away
        ]
      )
    end

end

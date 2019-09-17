class OscillatorsController < ApplicationController
  before_action :set_oscillator, only: [:show, :edit, :update, :destroy]

  # GET /oscillators
  # GET /oscillators.json
  def index
    @oscillators = Oscillator.all
  end

  # GET /oscillators/1
  # GET /oscillators/1.json
  def show
  end

  # GET /oscillators/new
  def new
    @oscillator = Oscillator.new
  end

  # GET /oscillators/1/edit
  def edit
  end

  # POST /oscillators
  # POST /oscillators.json
  def create
    @oscillator = Oscillator.new(oscillator_params)

    respond_to do |format|
      if @oscillator.save
        format.html { redirect_to @oscillator, notice: 'Oscillator was successfully created.' }
        format.json { render :show, status: :created, location: @oscillator }
      else
        format.html { render :new }
        format.json { render json: @oscillator.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /oscillators/1
  # PATCH/PUT /oscillators/1.json
  def update
    respond_to do |format|
      if @oscillator.update(oscillator_params)
        format.html { redirect_to @oscillator, notice: 'Oscillator was successfully updated.' }
        format.json { render :show, status: :ok, location: @oscillator }
      else
        format.html { render :edit }
        format.json { render json: @oscillator.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /oscillators/1
  # DELETE /oscillators/1.json
  def destroy
    @oscillator.destroy
    respond_to do |format|
      format.html { redirect_to oscillators_url, notice: 'Oscillator was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_oscillator
      @oscillator = Oscillator.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def oscillator_params
      params.require(:oscillator).permit(:frequency, :wave, :detune)
    end
end

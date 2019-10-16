class SynthController < ApplicationController
  def index
  end

  def save
    logger.debug "============================="
    logger.debug params[:id]
    logger.debug params[:data]
    logger.debug "============================="

    # preset = Preset.find(params[:id])

    preset = Preset.create_with(data: params[:data].to_json).find_or_create_by(id: params[:id])
    # preset.data = params[:data].to_json

    preset.update_attribute(:data, params[:data].to_json)

  end

  def load
    preset = Preset.find(params[:id])

    logger.debug "============"
    logger.debug preset[:data]
    logger.debug "============"
    logger.debug preset.to_json
    logger.debug "============"

    render json: preset.data.to_json

    # respond_to do |format|
    #   if @oscillator.save
    #     format.html { redirect_to @oscillator, notice: 'Oscillator was successfully created.' }
    #     format.json { render :show, status: :created, location: @oscillator }
    #   else
    #     format.json { render json: @oscillator.errors, status: :unprocessable_entity }
    #   end
    # end
  end
end

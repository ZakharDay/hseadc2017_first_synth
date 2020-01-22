class SynthController < ApplicationController
  def index
    # Current_distance is the distance from a user in the gallery to the sensor...
    # it ranges from ~10mm to 1200mm... further than 1,2m nothing can be seen...
    @current_distance = 0

    respond_to do |format|
      format.html {  }
      format.json { render json: @current_distance  }
      format.js   {  }
    end
  end

  def set_current_distance
    current_distance = params[:current_distance].to_i
    operation = ['minus', 'plus'].sample
    step_size = [1, 4, 10, 12, 22, 40, 64].sample
    current_distance_min = 0
    current_distance_max = 1200

    if operation == 'minus'
      if current_distance - step_size >= current_distance_min
        current_distance = current_distance - step_size
      else
        current_distance = current_distance + step_size
      end
    elsif operation == 'plus'
      if current_distance + step_size <= current_distance_max
        current_distance = current_distance + step_size
      else
        current_distance = current_distance - step_size
      end
    end

    puts "CURRENT DISTANCE #{current_distance}"

    respond_to do |format|
      format.html {  }
      format.json { render json: current_distance  }
      format.js   {  }
    end
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

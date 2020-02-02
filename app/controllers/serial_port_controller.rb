class SerialPortController < ApplicationController

  def read
    # @measurment = Measurment.new(resistance: $ohm_meter.get_resistance)
    @measurment = $ohm_meter.get_resistance

    respond_to do |format|
      # if @measurment.save
        # format.html
        json = { measurment: @measurment }
        format.json { render json: json.to_json }
      # else
        # logger.debug "ERROR"
      # end
    end
  end

  def open
  end

end

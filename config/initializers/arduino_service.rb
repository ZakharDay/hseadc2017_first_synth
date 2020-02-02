puts "PUTS"

class ArduinoService
  def initialize
    Rails.logger.debug "TEST"
    puts "TEST"
    # port_str = "/dev/cu.usbmodem1411"
    # port_str = "/dev/cu.wchusbserial1410"
    # /dev/cu.usbserial-1420
    # /dev/cu.wchusbserial1420
    port_str = "/dev/cu.wchusbserial1420"
    baud_rate = 9600
    data_bits = 8
    stop_bits = 1
    parity = SerialPort::NONE

    if port_connected?(port_str)
      unless $sp
        Rails.logger.debug 'Not Work'
        puts 'Not Work'
        $sp = SerialPort.new(port_str, baud_rate, data_bits, stop_bits, parity)
      end

      r = order_confirmation

      Rails.logger.debug 'Arduino Port Connected'
      puts 'Arduino Port Connected'
      Rails.logger.debug r
      puts r
      r
    else
      Rails.logger.debug 'Arduino Port Not Connected'
      puts 'Arduino Port Not Connected'
      nil
    end
  end

  def order_confirmation
    sleep 10
    $sp.write(0)
    Rails.logger.debug 'YO'
    puts 'YO'
    Rails.logger.debug $sp.gets.chomp
    puts $sp.gets.chomp
    resistance = $sp.gets.chomp
    # sleep 3
    # $sp.flush
    # sp.close

    resistance
  end

  def get_resistance
    $sp.gets.chomp
  end

  def get_everything
    $sp.gets
  end

  def port_connected?(port)
    return true if Dir.glob(port).count == 1
  end
end

Rails.logger.debug "TEST TEST"
puts "TEST TEST"
$sp = nil
$ohm_meter = ArduinoService.new

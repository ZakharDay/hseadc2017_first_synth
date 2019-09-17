require 'test_helper'

class OscillatorsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @oscillator = oscillators(:one)
  end

  test "should get index" do
    get oscillators_url
    assert_response :success
  end

  test "should get new" do
    get new_oscillator_url
    assert_response :success
  end

  test "should create oscillator" do
    assert_difference('Oscillator.count') do
      post oscillators_url, params: { oscillator: { detune: @oscillator.detune, frequency: @oscillator.frequency, wave: @oscillator.wave } }
    end

    assert_redirected_to oscillator_url(Oscillator.last)
  end

  test "should show oscillator" do
    get oscillator_url(@oscillator)
    assert_response :success
  end

  test "should get edit" do
    get edit_oscillator_url(@oscillator)
    assert_response :success
  end

  test "should update oscillator" do
    patch oscillator_url(@oscillator), params: { oscillator: { detune: @oscillator.detune, frequency: @oscillator.frequency, wave: @oscillator.wave } }
    assert_redirected_to oscillator_url(@oscillator)
  end

  test "should destroy oscillator" do
    assert_difference('Oscillator.count', -1) do
      delete oscillator_url(@oscillator)
    end

    assert_redirected_to oscillators_url
  end
end

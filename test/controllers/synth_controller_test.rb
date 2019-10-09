require 'test_helper'

class SynthControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get synth_index_url
    assert_response :success
  end

end

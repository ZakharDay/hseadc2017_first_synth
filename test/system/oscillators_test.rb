require "application_system_test_case"

class OscillatorsTest < ApplicationSystemTestCase
  setup do
    @oscillator = oscillators(:one)
  end

  test "visiting the index" do
    visit oscillators_url
    assert_selector "h1", text: "Oscillators"
  end

  test "creating a Oscillator" do
    visit oscillators_url
    click_on "New Oscillator"

    fill_in "Detune", with: @oscillator.detune
    fill_in "Frequency", with: @oscillator.frequency
    fill_in "Wave", with: @oscillator.wave
    click_on "Create Oscillator"

    assert_text "Oscillator was successfully created"
    click_on "Back"
  end

  test "updating a Oscillator" do
    visit oscillators_url
    click_on "Edit", match: :first

    fill_in "Detune", with: @oscillator.detune
    fill_in "Frequency", with: @oscillator.frequency
    fill_in "Wave", with: @oscillator.wave
    click_on "Update Oscillator"

    assert_text "Oscillator was successfully updated"
    click_on "Back"
  end

  test "destroying a Oscillator" do
    visit oscillators_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Oscillator was successfully destroyed"
  end
end

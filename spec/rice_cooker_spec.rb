require_relative '../src/model/rice_cooker'

RSpec.describe 'Rice cooker app' do

  it 'should not have water' do
    rice_cooker = RiceCooker.new
    expect(rice_cooker.has_water).to eq(false)
  end

  it 'should call addWater' do
    rice_cooker = RiceCooker.new
    rice_cooker.add_water
    expect(rice_cooker.has_water).to eq(true)
  end

  it 'should stop cooking' do
    rice_cooker = RiceCooker.new
    rice_cooker.stop_cooking
    expect(rice_cooker.is_cooking).to eq(false)
  end

  #it 'should cook vary gasy successfully' do
    #rice_cooker = RiceCooker.new
    #allow_any_instance_of(Kernel).to receive(:sleep)
    #rice_cooker.add_water
    #captured_output = StringIO.new
    #$stdout = captured_output
    #promise = rice_cooker.start_cooking('vary gasy', 3)

    #sleep 3

    #output_lines = captured_output.string.split("\n")

    #$stdout = STDOUT

    #expect(rice_cooker.has_water).to eq(false)
  #end
end

import { RiceCooker } from '../src/model/rice-cooker';
import mockStdin from 'mock-stdin';

describe('Rice cooker app', () => {

  it('should call addWater when user choose 1', async () => {
    const riceCooker = new RiceCooker();
    riceCooker.addWater();
    expect(riceCooker.hasWater).toEqual(true);
  });

  it('should cook vary gasy successfully', async () => {
    const riceCooker = new RiceCooker();
    jest.useFakeTimers();
    riceCooker.addWater();
    const promise = riceCooker.startCooking('vary gasy', 3);
    jest.runOnlyPendingTimers();
    await promise;
    expect(riceCooker.hasWater).toEqual(false);
  });
});

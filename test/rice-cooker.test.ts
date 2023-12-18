import { RiceCooker } from '../src/model/rice-cooker';

describe('Rice cooker app', () => {

  it('should not have water', async () => {
    const riceCooker = new RiceCooker();
    expect(riceCooker.hasWater).toEqual(false);
  });

  it('should have water', async () => {
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

  it('should reheat ronono successfully', async () => {
    const riceCooker = new RiceCooker();
    jest.useFakeTimers();
    riceCooker.addWater();
    const promise = riceCooker.startReheating('ronono');
    jest.runOnlyPendingTimers();
    await promise;
    expect(riceCooker.hasWater).toEqual(false);
  });

  it('should not cooking', async () => {
    const riceCooker = new RiceCooker();
    riceCooker.stopCooking();
    expect(riceCooker.isCooking).toEqual(false);
  });
});

import { ThousandSeparatorPipe } from './thousand-separator.pipe';

describe('ThousandSeparatorPipe', () => {
  it('create an instance', () => {
    const pipe = new ThousandSeparatorPipe();
    expect(pipe).toBeTruthy();
  });
});

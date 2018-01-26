import { ReleaseYearSortPipe } from './release-year-sort.pipe';

describe('DateSortPipe', () => {
  it('create an instance', () => {
    const pipe = new ReleaseYearSortPipe();
    expect(pipe).toBeTruthy();
  });
});

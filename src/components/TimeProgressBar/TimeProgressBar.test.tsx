import { render } from '@testing-library/react';
import TimeProgressBar from './TimeProgressBar';
import { Experience } from '@/types/types';
import moment from 'moment';
import { describe, test } from '@jest/globals';

describe('TimeProgressBar', () => {

  let spy: jest.SpyInstance<number, []>

  const createMockJob = (
    startDate: moment.Moment,
    endDate: moment.Moment | null = null
  ): Experience => ({
    startDate,
    endDate,
  } as Experience);

  beforeEach(() => {
    // Mock the current date to make tests deterministic
    const fixedDate = new Date('2025-01-01T12:00:00Z');
    spy = jest.spyOn(global.Date, 'now').mockImplementation(() => fixedDate.valueOf());
  });

  afterEach(() => {
    // Clean up
    spy.mockRestore();
  });

  test('renders the progress bar container', () => {
    const job = createMockJob(moment('2020-01-01'), moment('2022-01-01'));
    const { container } = render(<TimeProgressBar job={job} />);

    const progressBarContainer = container.querySelector('.relative.h-2.bg-gray-200.rounded-full');
    expect(progressBarContainer).toBeInTheDocument();
  });

  test('renders the progress bar fill', () => {
    const job = createMockJob(moment('2020-01-01'), moment('2022-01-01'));
    const { container } = render(<TimeProgressBar job={job} />);

    const progressFill = container.querySelector('.bg-gradient-to-r.from-blue-500.to-indigo-500');
    expect(progressFill).toBeInTheDocument();
  });

  test('renders the progress indicator dot', () => {
    const job = createMockJob(moment('2020-01-01'), moment('2022-01-01'));
    const { container } = render(<TimeProgressBar job={job} />);

    const progressDot = container.querySelector('.w-3.h-3.bg-blue-600.rounded-full.shadow-md');
    expect(progressDot).toBeInTheDocument();
  });

  test('calculates progress for completed job (with end date)', () => {
    const job = createMockJob(moment('2020-01-01'), moment('2022-01-01'));
    const { container } = render(<TimeProgressBar job={job} />);

    const progressFill = container.querySelector('.bg-gradient-to-r') as HTMLElement;
    expect(progressFill).toHaveStyle({ width: '40%' }); //Should roughly be 40% if current date is 2025-01-01 (set by mock)
  });

  test('calculates progress for ongoing job (without end date)', () => {
    const job = createMockJob(moment('2020-01-01'), null);
    const { container } = render(<TimeProgressBar job={job} />);

    const progressFill = container.querySelector('.bg-gradient-to-r') as HTMLElement;
    expect(progressFill).toHaveStyle({ width: '100%' });
  });

  test('caps progress at 100%', () => {
    const job = createMockJob(moment('2020-01-01'), moment('2022-01-01'));
    const { container } = render(<TimeProgressBar job={job} />);

    const progressFill = container.querySelector('.bg-gradient-to-r') as HTMLElement;
    const width = parseFloat(progressFill.style.width);
    expect(width).toBeLessThanOrEqual(100);
  });

  test('positions the progress dot correctly relative to progress', () => {
    const job = createMockJob(moment('2020-01-01'), moment('2021-01-01'));
    const { container } = render(<TimeProgressBar job={job} />);

    const progressFill = container.querySelector('.bg-gradient-to-r') as HTMLElement;
    const progressDot = container.querySelector('.w-3.h-3.bg-blue-600') as HTMLElement;

    const progressWidth = progressFill.style.width;
    const expectedLeft = `calc(${progressWidth} - 6px)`;

    expect(progressDot).toHaveStyle({ left: expectedLeft });
  });

  test('has correct container styling classes', () => {
    const job = createMockJob(moment('2020-01-01'), moment('2022-01-01'));
    const { container } = render(<TimeProgressBar job={job} />);

    const outerContainer = container.querySelector('.mb-4');
    expect(outerContainer).toBeInTheDocument();

    const progressBarBg = container.querySelector('.relative.h-2');
    expect(progressBarBg).toHaveClass(
      'relative',
      'h-2',
      'bg-gray-200',
      'rounded-full',
      'overflow-hidden'
    );
  });

  test('progress fill has correct gradient classes', () => {
    const job = createMockJob(moment('2020-01-01'), moment('2022-01-01'));
    const { container } = render(<TimeProgressBar job={job} />);

    const progressFill = container.querySelector('.absolute.h-full');
    expect(progressFill).toHaveClass(
      'absolute',
      'h-full',
      'bg-gradient-to-r',
      'from-blue-500',
      'to-indigo-500',
      'rounded-full'
    );
  });

  test('progress dot has correct styling classes', () => {
    const job = createMockJob(moment('2020-01-01'), moment('2022-01-01'));
    const { container } = render(<TimeProgressBar job={job} />);

    const progressDot = container.querySelector('.w-3.h-3');
    expect(progressDot).toHaveClass(
      'absolute',
      'top-1/2',
      '-translate-y-1/2',
      'w-3',
      'h-3',
      'bg-blue-600',
      'rounded-full',
      'shadow-md'
    );
  });

  test('memoizes correctly - does not re-render with same job', () => {
    const job = createMockJob(moment('2020-01-01'), moment('2022-01-01'));
    const { rerender, container } = render(<TimeProgressBar job={job} />);

    const firstRenderFill = container.querySelector('.bg-gradient-to-r') as HTMLElement;
    const firstWidth = firstRenderFill.style.width;

    // Re-render with same job object
    rerender(<TimeProgressBar job={job} />);

    const secondRenderFill = container.querySelector('.bg-gradient-to-r') as HTMLElement;
    const secondWidth = secondRenderFill.style.width;

    expect(firstWidth).toBe(secondWidth);
  });

  test('updates when job prop changes', () => {
    const job1 = createMockJob(moment('2020-01-01'), moment('2021-01-01'));
    const job2 = createMockJob(moment('2019-01-01'), moment('2023-01-01'));

    const { rerender, container } = render(<TimeProgressBar job={job1} />);

    const firstRenderFill = container.querySelector('.bg-gradient-to-r') as HTMLElement;
    const firstWidth = firstRenderFill.style.width;

    rerender(<TimeProgressBar job={job2} />);

    const secondRenderFill = container.querySelector('.bg-gradient-to-r') as HTMLElement;
    const secondWidth = secondRenderFill.style.width;

    // Width should be different for different date ranges
    expect(firstWidth).not.toBe(secondWidth);
  });

  test('handles edge case: start date is very recent', () => {
    const job = createMockJob(moment().subtract(1, 'day'), null);
    const { container } = render(<TimeProgressBar job={job} />);

    const progressFill = container.querySelector('.bg-gradient-to-r') as HTMLElement;
    expect(progressFill).toHaveStyle({ width: '100%' });
  });

  test('handles edge case: start date equals end date', () => {
    const date = moment('2020-01-01');
    const job = createMockJob(date, date);
    const { container } = render(<TimeProgressBar job={job} />);

    const progressFill = container.querySelector('.bg-gradient-to-r') as HTMLElement;
    expect(progressFill).toHaveStyle({ width: '0%' });
  });
});
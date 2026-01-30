import { render, screen } from '@testing-library/react';
import CVSaving from './CVSaving';
import { describe, test } from '@jest/globals';

describe('CVSaving', () => {
  test('renders nothing when isVisible is false', () => {
    const { container } = render(<CVSaving isVisible={false} />);
    
    expect(container.firstChild).toBeNull();
  });

  test('renders the loading overlay when isVisible is true', () => {
    render(<CVSaving isVisible={true} />);
    
    const overlay = screen.getByText('Exporting CV to PDF...').closest('div[class*="fixed"]');
    expect(overlay).toBeInTheDocument();
  });

  test('displays the main loading text', () => {
    render(<CVSaving isVisible={true} />);
    
    const loadingText = screen.getByText('Exporting CV to PDF...');
    expect(loadingText).toBeInTheDocument();
    expect(loadingText).toHaveClass('text-white', 'text-xl', 'font-semibold');
  });

  test('displays the subtitle text', () => {
    render(<CVSaving isVisible={true} />);
    
    const subtitle = screen.getByText('Please wait a moment');
    expect(subtitle).toBeInTheDocument();
    expect(subtitle).toHaveClass('text-gray-300', 'text-sm');
  });

  test('renders the spinner element', () => {
    const { container } = render(<CVSaving isVisible={true} />);
    
    const spinner = container.querySelector('.animate-spin');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass(
      'w-16',
      'h-16',
      'border-4',
      'border-gray-300',
      'border-t-blue-500',
      'rounded-full',
      'animate-spin'
    );
  });

  test('has correct overlay styling with backdrop blur', () => {
    const { container } = render(<CVSaving isVisible={true} />);
    
    const overlay = container.querySelector('.fixed.inset-0');
    expect(overlay).toHaveClass(
      'fixed',
      'inset-0',
      'z-50',
      'flex',
      'items-center',
      'justify-center',
      'bg-black',
      'bg-opacity-50',
      'backdrop-blur-sm'
    );
  });

  test('has correct container layout styling', () => {
    const { container } = render(<CVSaving isVisible={true} />);
    
    const contentContainer = container.querySelector('.flex.flex-col.items-center.space-y-4');
    expect(contentContainer).toBeInTheDocument();
    expect(contentContainer).toHaveClass(
      'flex',
      'flex-col',
      'items-center',
      'space-y-4'
    );
  });

  test('toggles visibility correctly', () => {
    const { rerender } = render(<CVSaving isVisible={false} />);
    
    expect(screen.queryByText('Exporting CV to PDF...')).not.toBeInTheDocument();
    
    rerender(<CVSaving isVisible={true} />);
    
    expect(screen.getByText('Exporting CV to PDF...')).toBeInTheDocument();
    
    rerender(<CVSaving isVisible={false} />);
    
    expect(screen.queryByText('Exporting CV to PDF...')).not.toBeInTheDocument();
  });

  test('spinner is wrapped in a relative positioned container', () => {
    const { container } = render(<CVSaving isVisible={true} />);
    
    const spinnerWrapper = container.querySelector('.relative');
    expect(spinnerWrapper).toBeInTheDocument();
    
    const spinner = spinnerWrapper?.querySelector('.animate-spin');
    expect(spinner).toBeInTheDocument();
  });
});
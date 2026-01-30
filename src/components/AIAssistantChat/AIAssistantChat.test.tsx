import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AIAssistantChat from './AIAssistantChat';

describe('AIAssistantChat', () => {
  test('renders the chat button', () => {
    render(<AIAssistantChat />);
    
    const button = screen.getByRole('button', { name: /open chat/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Ask AI');
  });

  test('does not display iframe initially', () => {
    render(<AIAssistantChat />);
    
    const iframe = screen.queryByTitle('Claude Artifact');
    expect(iframe).not.toBeInTheDocument();
  });

  test('displays iframe when button is clicked', async () => {
    const user = userEvent.setup();
    render(<AIAssistantChat />);
    
    const button = screen.getByRole('button', { name: /open chat/i });
    await user.click(button);
    
    const iframe = screen.getByTitle('Claude Artifact');
    expect(iframe).toBeInTheDocument();
  });

  test('hides iframe when button is clicked again', async () => {
    const user = userEvent.setup();
    render(<AIAssistantChat />);
    
    const button = screen.getByRole('button', { name: /open chat/i });
    
    // Open
    await user.click(button);
    expect(screen.getByTitle('Claude Artifact')).toBeInTheDocument();
    
    // Close
    await user.click(button);
    expect(screen.queryByTitle('Claude Artifact')).not.toBeInTheDocument();
  });

  test('iframe has correct attributes and styles', async () => {
    const user = userEvent.setup();
    render(<AIAssistantChat />);
    
    const button = screen.getByRole('button', { name: /open chat/i });
    await user.click(button);
    
    const iframe = screen.getByTitle('Claude Artifact');
    
    expect(iframe).toHaveAttribute('src', 'https://claude.site/public/artifacts/18a98671-03e1-4e54-826a-1d01ef94dfa9/embed');
    expect(iframe).toHaveAttribute('frameBorder', '0');
    expect(iframe).toHaveAttribute('allow', 'clipboard-write');
    expect(iframe).toHaveAttribute('allowFullScreen');
    
    expect(iframe).toHaveStyle({
      position: 'fixed',
      top: '100px',
      right: '0px',
      width: '400px',
      height: '500px'
    });
  });

  test('button has correct styling classes', () => {
    render(<AIAssistantChat />);
    
    const button = screen.getByRole('button', { name: /open chat/i });
    
    expect(button).toHaveClass(
      'flex',
      'items-center',
      'gap-2.5',
      'fixed',
      'bottom-[40px]',
      'right-[40px]',
      'bg-blue-600',
      'hover:bg-blue-700',
      'text-white',
      'rounded-full',
      'p-4',
      'shadow-lg',
      'transition-all',
      'duration-300',
      'hover:scale-110'
    );
  });
});
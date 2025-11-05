import { render, screen } from '@testing-library/react';
import Page from './page';

describe('Home Page', () => {
  test('has red background', () => {
    const { container } = render(<Page />);
    
    // container.firstChild refers to the root div in your component
    expect(container.firstChild).toHaveClass('bg-green-600');
  });
});

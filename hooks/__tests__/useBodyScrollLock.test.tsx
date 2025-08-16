import React from 'react';
import { render, act } from '@testing-library/react';
import useBodyScrollLock from '../useBodyScrollLock';

const TestComponent = ({ isOpen }: { isOpen: boolean }) => {
  useBodyScrollLock(isOpen);
  return <div>test</div>;
};

beforeEach(() => {
  document.body.removeAttribute('style');
  document.documentElement.removeAttribute('style');
  Object.defineProperty(window, 'scrollY', { configurable: true, value: 150 });
  Object.defineProperty(window, 'pageYOffset', { configurable: true, value: 150 });
});

afterEach(() => {
  jest.restoreAllMocks();
});

it('does not modify styles when closed', () => {
  render(<TestComponent isOpen={false} />);
  expect(document.body.style.position).toBe('');
});

it('locks body scroll when open and restores on unmount', () => {
  const { unmount, rerender } = render(<TestComponent isOpen={true} />);

  // Locked
  expect(document.body.style.position).toBe('fixed');
  expect(document.body.style.top).toBe('-150px');
  expect(document.body.style.overflow).toBe('hidden');
  expect((document.documentElement.style as any).scrollBehavior).toBe('auto');

  // Close (cleanup)
  rerender(<TestComponent isOpen={false} />);
  unmount();

  expect(document.body.style.position).toBe('');
  expect(document.body.style.top).toBe('');
  expect(document.body.style.overflow).toBe('');
});

it('applies iOS hardening styles and event listeners', () => {
  const addEventListenerSpy = jest.spyOn(document, 'addEventListener');
  const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');

  const { unmount } = render(<TestComponent isOpen={true} />);

  expect((document.body.style as any).touchAction).toBe('none');
  expect((document.body.style as any).overscrollBehaviorY).toBe('none');
  expect((document.documentElement.style as any).overscrollBehaviorY).toBe('none');

  expect(addEventListenerSpy).toHaveBeenCalledWith('touchmove', expect.any(Function), { passive: false });
  expect(addEventListenerSpy).toHaveBeenCalledWith('wheel', expect.any(Function), { passive: false });

  unmount();

  expect(removeEventListenerSpy).toHaveBeenCalledWith('touchmove', expect.any(Function));
  expect(removeEventListenerSpy).toHaveBeenCalledWith('wheel', expect.any(Function));
});



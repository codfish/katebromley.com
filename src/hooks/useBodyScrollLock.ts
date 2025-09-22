import { useEffect } from 'react';

/**
 * Locks body scroll when `isLocked` is true and restores it on cleanup.
 * Includes iOS hardening (overscroll-behavior, touchmove/wheel preventDefault).
 */
export default function useBodyScrollLock(isLocked: boolean): void {
  useEffect(() => {
    if (!isLocked || typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    const body = document.body;
    const html = document.documentElement;

    const previous = {
      scrollY: window.scrollY || window.pageYOffset || 0,
      body: {
        position: body.style.position,
        top: body.style.top,
        left: body.style.left,
        right: body.style.right,
        width: body.style.width,
        overflow: body.style.overflow,
        touchAction: (body.style as any).touchAction,
        overscrollBehaviorY: (body.style as any).overscrollBehaviorY,
        WebkitOverflowScrolling: (body.style as any).webkitOverflowScrolling,
      },
      html: {
        scrollBehavior: (html.style as any).scrollBehavior,
        overscrollBehaviorY: (html.style as any).overscrollBehaviorY,
      },
    };

    const preventDefault = (event: Event) => {
      event.preventDefault();
    };

    // Prevent scroll and layout shift
    body.style.position = 'fixed';
    body.style.top = `-${previous.scrollY}px`;
    body.style.left = '0';
    body.style.right = '0';
    body.style.width = '100%';
    body.style.overflow = 'hidden';

    // iOS hardening
    (body.style as any).touchAction = 'none';
    (body.style as any).overscrollBehaviorY = 'none';
    (html.style as any).overscrollBehaviorY = 'none';
    (html.style as any).scrollBehavior = 'auto';

    // As a belt-and-suspenders approach on mobile Safari
    document.addEventListener('touchmove', preventDefault, { passive: false });
    document.addEventListener('wheel', preventDefault, { passive: false });

    return () => {
      // Restore inline styles
      body.style.position = previous.body.position;
      body.style.top = previous.body.top;
      body.style.left = previous.body.left;
      body.style.right = previous.body.right;
      body.style.width = previous.body.width;
      body.style.overflow = previous.body.overflow;
      (body.style as any).touchAction = previous.body.touchAction;
      (body.style as any).overscrollBehaviorY = previous.body.overscrollBehaviorY;
      (body.style as any).webkitOverflowScrolling = previous.body.WebkitOverflowScrolling;

      (html.style as any).scrollBehavior = previous.html.scrollBehavior;
      (html.style as any).overscrollBehaviorY = previous.html.overscrollBehaviorY;

      // Remove listeners
      document.removeEventListener('touchmove', preventDefault as EventListener);
      document.removeEventListener('wheel', preventDefault as EventListener);

      // Restore scroll position
      window.scrollTo(0, previous.scrollY);
    };
  }, [isLocked]);
}

'use client';

import { useReportWebVitals } from 'next/web-vitals';

export function WebVitals() {
  useReportWebVitals(metric => {
    // Use `window.gtag` if you initialized Google Analytics as this example:
    // https://github.com/vercel/next.js/blob/canary/examples/with-google-analytics
    window.gtag?.('event', metric.name, {
      value: metric.delta,
      event_label: metric.id, // id unique to current page load
      metric_id: metric.id, // Needed to aggregate events.
      metric_value: metric.value, // Optional.
      metric_delta: metric.delta, // Optional.
      metric_rating: metric.rating, // Optional.
      non_interaction: true, // avoids affecting bounce rate.
    });
  });

  return null;
}

import { Subject, BehaviorSubject } from "rxjs";
import { map, filter, debounceTime } from "rxjs/operators";

interface AnalyticsEvent {
  type: string;
  data: any;
  timestamp: number;
}

class AnalyticsService {
  private events$ = new Subject<AnalyticsEvent>();
  private metrics$ = new BehaviorSubject<any>({});

  constructor() {
    this.initializeEventProcessing();
  }

  private initializeEventProcessing() {
    this.events$
      .pipe(
        debounceTime(1000), // Aggregate events over 1 second
      )
      .subscribe((event) => {
        this.processEvent(event);
      });
  }

  private processEvent(event: AnalyticsEvent) {
    const currentMetrics = this.metrics$.value;

    switch (event.type) {
      case "pageView":
        this.updatePageViews(currentMetrics, event.data);
        break;
      case "interaction":
        this.updateInteractions(currentMetrics, event.data);
        break;
      case "progress":
        this.updateProgress(currentMetrics, event.data);
        break;
      default:
        console.warn(`Unhandled event type: ${event.type}`);
    }
  }

  private updatePageViews(metrics: any, data: any) {
    const pageViews = metrics.pageViews || {};
    pageViews[data.page] = (pageViews[data.page] || 0) + 1;

    this.metrics$.next({
      ...metrics,
      pageViews,
      lastActivity: Date.now(),
    });
  }

  private updateInteractions(metrics: any, data: any) {
    const interactions = metrics.interactions || [];
    interactions.push({
      ...data,
      timestamp: Date.now(),
    });

    this.metrics$.next({
      ...metrics,
      interactions: interactions.slice(-100), // Keep last 100 interactions
      lastActivity: Date.now(),
    });
  }

  private updateProgress(metrics: any, data: any) {
    const progress = metrics.progress || {};
    progress[data.courseId] = data.value;

    this.metrics$.next({
      ...metrics,
      progress,
      lastActivity: Date.now(),
    });
  }

  trackEvent(type: string, data: any) {
    this.events$.next({
      type,
      data,
      timestamp: Date.now(),
    });
  }

  getMetrics() {
    return this.metrics$.asObservable();
  }

  getMetricsByType(type: string) {
    return this.metrics$.pipe(map((metrics) => metrics[type] || {}));
  }

  getRealtimeUsers() {
    const ACTIVITY_THRESHOLD = 5 * 60 * 1000; // 5 minutes
    return this.metrics$.pipe(
      map((metrics) => {
        const now = Date.now();
        return Object.values(metrics.pageViews || {}).filter(
          (timestamp: any) => now - timestamp < ACTIVITY_THRESHOLD,
        ).length;
      }),
    );
  }
}

export const analyticsService = new AnalyticsService();

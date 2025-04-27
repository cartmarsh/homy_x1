import { track } from '@vercel/analytics';

interface TrackEventOptions {
  name: string;
  properties?: Record<string, any>;
}

export const useAnalytics = () => {
  const trackEvent = ({ name, properties }: TrackEventOptions) => {
    try {
      track(name, properties);
    } catch (error) {
      console.error('Error tracking event:', error);
    }
  };

  const trackPageView = (page: string) => {
    trackEvent({
      name: 'page_view',
      properties: {
        path: page,
        title: document.title
      }
    });
  };

  const trackPortfolioItemClick = (itemName: string) => {
    trackEvent({
      name: 'portfolio_item_click',
      properties: {
        item: itemName
      }
    });
  };

  const trackContactFormSubmission = (success: boolean) => {
    trackEvent({
      name: 'contact_form_submission',
      properties: {
        success,
        timestamp: new Date().toISOString()
      }
    });
  };

  const trackSectionVisibility = (sectionId: string, isVisible: boolean) => {
    trackEvent({
      name: 'section_visibility',
      properties: {
        section: sectionId,
        visible: isVisible,
        timestamp: new Date().toISOString()
      }
    });
  };

  const trackInteraction = (type: string, details?: Record<string, any>) => {
    trackEvent({
      name: 'user_interaction',
      properties: {
        type,
        ...details,
        timestamp: new Date().toISOString()
      }
    });
  };

  return {
    trackEvent,
    trackPageView,
    trackPortfolioItemClick,
    trackContactFormSubmission,
    trackSectionVisibility,
    trackInteraction
  };
};

export default useAnalytics; 
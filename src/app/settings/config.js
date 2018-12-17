angular.module('app').config(($logProvider, $locationProvider, $provide, toastrConfig, ngTableFilterConfigProvider, AnalyticsProvider) => {
  // Google Analytics
  AnalyticsProvider.setAccount('UA-76969334-1'); // UA-76969334-1
  AnalyticsProvider.trackPages(false);
  AnalyticsProvider.ignoreFirstPageLoad(true);

  // Log configuration
  $logProvider.debugEnabled(true);

  // Negative currency
  $provide.decorator('$locale', [
    '$delegate',
    ($delegate) => {
      if ($delegate.id === 'en-us') {
        $delegate.NUMBER_FORMATS.PATTERNS[1].negPre = '-\u00A4';
        $delegate.NUMBER_FORMATS.PATTERNS[1].negSuf = '';
      }
      return $delegate;
    }
  ]);

  // Setting this property to true will elimate the # from all URLs
  $locationProvider.html5Mode(false);

  // Toastr
  angular.extend(toastrConfig, {
    maxOpened: 10,
    newestOnTop: false,
    positionClass: 'toast-bottom-left',
    preventDuplicates: false,
    preventOpenDuplicates: true,
    allowHtml: true,
    progressBar: false,
    closeButton: true,
    extendedTimeOut: 1000,
    timeOut: 8000
  });

  // Scrolling page to the very top no matter what
  $provide.decorator('$uiViewScroll', ($delegate) => {
    return (uiViewElement) => {
      window.scrollTo(0, 0);
    };
  });

  // ngTable filter settings
  ngTableFilterConfigProvider.setConfig({
    aliasUrls: {
      date: 'app/settings/ngTableFilters/date.tpl.html'
    }
  });
});

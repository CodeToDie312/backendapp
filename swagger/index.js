function waitForElm(selector) {
    return new Promise(resolve => {
      if (document.querySelector(selector)) {
        return resolve(document.querySelector(selector));
      }
  
      const observer = new MutationObserver(mutations => {
        if (document.querySelector(selector)) {
          resolve(document.querySelector(selector));
          observer.disconnect();
        }
      });
  
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    });
  }
  
  // Force change the Swagger logo in the header
  waitForElm('.topbar-wrapper').then((elm) => {
    if (window.SWAGGER_DOCS_ENV === 'development') {
      elm.innerHTML = `<img href='${window.location.origin}' src='#'/>`
    } else {
      elm.innerHTML = `<img href='#' width='200'/>`
    }
  });
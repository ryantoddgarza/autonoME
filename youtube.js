const util = {
  getDisplay(el) {
    return window.getComputedStyle(el, null).display;
  },
  debounce(callback, wait) {
    let timerId = null;
    return function (...args) {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        callback(...args);
      }, wait);
    };
  },
};

function hideElement(el) {
  const transitionTime = 1200;

  const setOpacity = () => {
    el.style.transition = `opacity ${transitionTime}ms`;
    el.style.opacity = 0;
  };

  const setDisplay = () => {
    el.style.display = 'none';
  };

  if (el && util.getDisplay(el) !== 'none') {
    setOpacity();
    setTimeout(setDisplay, transitionTime);
  }
}

function hideElementsById(idList) {
  idList.forEach((id) => {
    const el = document.getElementById(id);
    hideElement(el);
  });
}

function hideElementsByTagName(tagList) {
  tagList.forEach((tag) => {
    const HtmlCollection = document.getElementsByTagName(tag);
    const collectionList = Array.from(HtmlCollection);

    collectionList.forEach((el) => hideElement(el));
  });
}

function disableAutoplay() {
  const AUTONAV_DISABLED = localStorage.getItem('yt.autonav::autonav_disabled');
  if (!AUTONAV_DISABLED) {
    return;
  }

  const autonavDisabled = JSON.parse(AUTONAV_DISABLED).data;
  const isAutoplay = !autonavDisabled;
  const toggle = document.getElementById('toggle');

  if (!toggle) {
    setTimeout(disableAutoplay, 1000);
  }

  if (toggle && isAutoplay) {
    toggle.click();
  }
}

function handleIsHome() {
  const tagList = ['ytd-browse'];
  hideElementsByTagName(tagList);
}

function handleIsWatch() {
  const idList = ['related', 'comments'];
  hideElementsById(idList);
  disableAutoplay();
}

function handleIsResults() {
  const tagList = [
    'ytd-shelf-renderer',
    'ytd-carousel-ad-renderer',
    'ytd-horizontal-card-list-renderer',
  ];

  hideElementsByTagName(tagList);
}

function runForCurrentPage() {
  const currentPage = window.location.pathname;
  const isHome = currentPage === '/';
  const isResults = currentPage.startsWith('/results');
  const isWatch = currentPage.startsWith('/watch');

  if (isHome) {
    handleIsHome();
  }

  if (isWatch) {
    handleIsWatch();
  }

  if (isResults) {
    handleIsResults();
  }
}

function observeDomChange() {
  const handleChange = util.debounce(runForCurrentPage, 200);
  const observer = new MutationObserver(handleChange);
  const bodyNode = document.querySelector('body');
  const config = {
    childList: true,
    subtree: true,
  };

  observer.observe(bodyNode, config);
}

function main() {
  observeDomChange();
}

main();

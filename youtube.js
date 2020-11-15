function hideComponent(el) {
  const transitionTime = 1200;

  const setOpacity = () => {
    el.style.transition = `opacity ${transitionTime}ms`;
    el.style.opacity = 0;
  };

  const setDisplay = () => {
    el.style.display = 'none';
  };

  setOpacity();
  setTimeout(setDisplay, transitionTime);
}

function hideComponentsById(componentIds) {
  componentIds.forEach((id) => {
    const el = document.getElementById(id);

    if (el) {
      hideComponent(el);
    }
  });
}

function hideComponentsByTagName(componentTags) {
  componentTags.forEach((tagName) => {
    const HtmlCollection = document.getElementsByTagName(tagName);

    for (let i = 0; i < HtmlCollection.length; i++) {
      hideComponent(HtmlCollection[i]);
    }
  });
}

function disableAutoplay() {
  const AUTONAV_DISABLED = localStorage.getItem('yt.autonav::autonav_disabled');
  const autonavState = JSON.parse(AUTONAV_DISABLED).data;
  const isAutoplay = !autonavState;

  const toggle = document.getElementById('toggle');

  if (!toggle) {
    setTimeout(disableAutoplay, 1000);
  }

  if (toggle && isAutoplay) {
    toggle.click();
  }
}

function handleCommon() {
  const commonComponentIDs = ['notification-count'];
  hideComponentsById(commonComponentIDs);
}

function handleIsHome() {
  const homeComponentIDs = ['primary', 'top-container'];
  hideComponentsById(homeComponentIDs);
}

function handleIsWatch() {
  const watchComponentIDs = ['related', 'comments'];
  hideComponentsById(watchComponentIDs);
  disableAutoplay();
}

function handleIsResults() {
  const resultsComponentTags = [
    'ytd-shelf-renderer',
    'ytd-carousel-ad-renderer',
    'ytd-horizontal-card-list-renderer',
  ];

  hideComponentsByTagName(resultsComponentTags);
}

function runForCurrentPage() {
  const currentPage = window.location.href;
  const isHome = currentPage.endsWith('.com/');
  const isResults = currentPage.includes('/results');
  const isWatch = currentPage.includes('/watch');

  handleCommon();

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

function burst() {
  const burstRate = 1000;
  const burstLength = 4000;
  let intervalID = null;

  function start() {
    intervalID = window.setInterval(() => {
      runForCurrentPage();
    }, burstRate);
  }

  function stop() {
    window.clearTimeout(intervalID);
  }

  function duration(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function runBurst() {
    start();
    await duration(burstLength);
    stop();
  }

  runBurst();
}

function onURLChange() {
  burst();
}

function getURL() {
  return window.location.href;
}

function pollForURLChange() {
  let currentPage = getURL();
  const repeatRate = 1 * 1000;

  window.setInterval(() => {
    if (getURL() !== currentPage) {
      onURLChange();
      currentPage = getURL();
    }
  }, repeatRate);
}

function init() {
  burst();
  pollForURLChange();
}

init();

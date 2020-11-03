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

function hideComponentsByTagName(HTMLcollection) {
  for (let i = 0; i < HTMLcollection.length; i++) {
    hideComponent(HTMLcollection[i]);
  }
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
  ];

  resultsComponentTags.forEach((tagName) => {
    const tag = document.getElementsByTagName(tagName);
    hideComponentsByTagName(tag);
  });
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
  const burstRate = 2000;
  const burstLength = 4000;
  const repeatAfter = 10 * 1000;
  let intervalID = null;

  function go() {
    intervalID = window.setInterval(() => {
      runForCurrentPage();
    }, burstRate);
  }

  function stop() {
    window.clearTimeout(intervalID);
  }

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function run() {
    go();
    await sleep(burstLength);
    stop();
  }

  run();
  window.setInterval(() => {
    run();
  }, repeatAfter);
}

function init() {
  burst();
}

init();

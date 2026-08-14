(() => {
  const route = document.documentElement.dataset.redirectRoute;

  if (!route) {
    return;
  }

  const destination = new URL(route, 'https://app.liooclo.com');
  destination.search = window.location.search;
  destination.hash = window.location.hash;
  window.location.replace(destination.toString());
})();

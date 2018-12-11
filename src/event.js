document.addEventListener('contextmenu', (e) => {
  if (e.dataSet['no-menu']) {
    e.preventDefault();
  }
})

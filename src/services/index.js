import apiExporter from './export';

const install = Vue => {
  if (install.installed) {
    return;
  }
  install.installed = true;

  Object.defineProperties(Vue.prototype, {
    $api: {
      get() {
        return apiExporter;
      },
    },
  });
};

export default install;

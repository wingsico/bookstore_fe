export function registerComponents(componentObject = {}) {
  Object.keys(componentObject).forEach(key => {
    componentObject[key].install = (Vue) => {
      Vue.component(componentObject[key].name, componentObject[key]);
    };
  });
}

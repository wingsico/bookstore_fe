export function registerComponents(componentObject = {}) {
  Object.keys(componentObject).forEach(key => {
    componentObject[key].install = (Vue) => {
      Vue.component(componentObject[key].name, componentObject[key]);
    };
  });
}

export function encrypt(str = "") {
  return str.split('').reverse().map(c => String.fromCharCode(c.charCodeAt() + 10)).join("")
}

export function decrypt(str = "") {
  return str.split('').reverse().map(c => String.fromCharCode(c.charCodeAt() - 10)).join("");
}

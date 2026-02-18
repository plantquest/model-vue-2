const l = "1.0.0-alpha.1", n = {
  install(e, o = {}) {
    console.log("[Vxg] Vue 3 plugin installed - v" + l), e.config.globalProperties.$vxg = {
      version: l,
      options: o
    }, e.provide("$vxg", {
      version: l,
      options: o
    });
  }
};
export {
  n as default,
  l as version
};
//# sourceMappingURL=vxg.es.js.map

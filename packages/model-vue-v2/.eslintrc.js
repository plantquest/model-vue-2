module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential"],//, "@vue/prettier"],
  rules: {
    "no-console": "off", //process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "vue/no-use-v-if-with-v-for": "off",
    "regexp/no-assertion-capturing-group": "off",
    "regexp/no-empty-group": "off"
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};


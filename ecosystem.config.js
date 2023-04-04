module.exports = {
  app: [
    {
      name: "eagle-eye-front",
      exec_mode: "cluster",
      script: "./node_modules/nuxt/bin/nuxt.js",
      args: "start",
      watch: true,
      instances: 8,
    },
  ],
};

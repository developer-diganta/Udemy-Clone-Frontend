// module.exports = {
//   preset: "@vue/cli-plugin-unit-jest",
//   moduleNameMapper: {
//     "axios": "axios/dist/node/axios.cjs"
//   }
// };

module.exports =  {
  preset: "@vue/cli-plugin-unit-jest",
  moduleFileExtensions: ["js", "json", "jsx", "ts", "tsx", "node", "vue"],

    moduleNameMapper: {
    "axios": "axios/dist/node/axios.cjs",
    "vuetify": "vuetify/dist/vuetify.js"
  },
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  transformIgnorePatterns: ['node_modules/(?!(vuetify))'],
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
};
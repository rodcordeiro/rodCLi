const axios = require('axios');

const api = axios.create({
    baseURL: "http://rodcordeiro.herokuapp.com/"
})

module.exports = api
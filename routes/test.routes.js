const testController = require("../controllers/test.controller");
module.exports = (app) => {

    app.post('/app/api/v1/evaluate/', testController.evaluate)
}
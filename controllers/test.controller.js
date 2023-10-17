const math = require('mathjs');

exports.evaluate = async (req, res) => {
    // const { data } = req.config;

    const data = req.body.data;
    console.log("DATA ", data);
    const response = [];


    if (!data || data.length === 0) {
        return res.status(400).json({ error: 'Expressions not provided' });
    }
    for (let i = 0; i < data.length; ++i) {
        const expression = data[i];
        try {
            const result = math.evaluate(expression);
            response.push(`${expression} => ${result}`);
        } catch (error) {
            response.push(`${expression} => ${error.message}`);
        }
    }
    res.json(response);
}
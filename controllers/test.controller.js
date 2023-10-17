const math = require('mathjs');

exports.evaluate = async (req, res) => {
    const { expressions } = req.body;

    if (!expressions || expressions.length === 0) {
        res.status(400).json({ error: 'Expressions not provided' });
        return;
    }

    const results = [];

    expressions.forEach((expression) => {
        try {
            const result = math.evaluate(expression);
            results.push(`${expression} => ${result}`);
        } catch (error) {
            results.push(`${expression} => ${error.message}`);
        }
    });

    res.json({ results });

}
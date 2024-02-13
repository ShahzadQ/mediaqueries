const {mq, executeMediaQuery} = require("../dist/index")

const query = mq({ type: 'all', minWidth: 200, maxWidth: 400 });
console.log(query);

const executed = executeMediaQuery(query);
console.log(executed);

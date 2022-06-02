const controller = {};
const transactions = require('./public/transactions.json');

controller.getData = async (req, res, next) => {
    // takes the id entered from the request query and retrieves proper info from the transactions api 
    const id = parseInt(req.query.id);
    try {
        res.locals.objectInfo = transactions[id - 1];
        // if (!res.locals.objectInfo) res.locals.objectInfo = 'Invalid id'
        next();
    }
    catch(err){
        next({
        log: 'Error in get data',
        status: 400,
        message: { Error: err },
        });
    }
}


controller.search = (req, res, next) => {
    console.log('request query body: ', req.query)
    const searchProperties = [];
    for (let key in req.query) {
        const obj = {};
        obj[key] = req.query[key];
        searchProperties.push(obj)
    }

    console.log('SEARCHPROPERTIES', searchProperties)

    const checkProperties = (searchPropertyList, currentTransactions) => {
        //when search properties array is empty, the final list of data will be returned
        if (searchPropertyList.length === 0) return currentTransactions;

        const newTransactionList = [];


        //checking each object in the current list of transactions, if the input parameter of whichever key/value is first in the list of properties searchable is found, that entire object of data will enter the new transaction list
        //so each time check properties is run, the list of properties that will have to be checked will become more narrow based on each input key matching with the proper value in the list
        currentTransactions.forEach(data => {
            const key = Object.keys(searchPropertyList[0])[0];
            const value = Object.values(searchPropertyList[0])[0];
            if (typeof data[key] === 'number') {
                if (data[key] === parseInt(value)) {
                    newTransactionList.push(data);
                }
            }
            else if (JSON.stringify(data[key]) === JSON.stringify(value)) {
                newTransactionList.push(data);

            }
        })

        // we will run the function until search properties is empty and we are left with the data that fits all the input key-value pairs
        return checkProperties(searchPropertyList.slice(1, searchPropertyList.length), newTransactionList);
    }

    try {
        const dataReturned = checkProperties(searchProperties, transactions);
        res.locals.data = dataReturned;
        next()
    }
    catch(err){
        next({
        log: 'Error in search middleware',
        status: 400,
        message: { Error: err },
        });
    }
}


controller.perAccountNum = (req, res, next) => {
    try {
        const account = req.query.num;
        accountData = [];
        
        transactions.forEach(object => {
            if (object.AccountNumber === account) accountData.push(object)
        })
        res.locals.data = accountData;
        next();
    }
    catch(err){
        next({
        log: 'Error in per account num middleware',
        status: 400,
        message: { Error: err },
        });
    }
}

module.exports = controller;
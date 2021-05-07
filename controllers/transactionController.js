const {connection} = require("../database/index")
const Joi = require("joi")

function transactionValid(transactionObject) {
    const schema = Joi.object({
        cardUUID: Joi.string().min(3).max(50).required(),
        initialBalance: Joi.number().min(0),
        transactionFare: Joi.number().min(0).required(),
        newBalance: Joi.number().min(0),
        transactionDate: Joi.date()
    })
    return schema.validate(transactionObject)
}

const createTransaction = async (newTransaction)=>{
    const validate = transactionValid(newTransaction)
    if(validate.error){
        return{
            success: false,
            message: "Invalid details!",
            err: validate.error.details
        }
    } 
    const cardUnq = newTransaction.cardUUID
    let initialbal=null;
    await connection.promise().query(`SELECT cardBalance FROM CARDS WHERE cardUUID=?`,cardUnq)
    .then(data => {
        initialbal = data[0][0].cardBalance;
    })
    .catch(e => {
        console.log("error: "+e.message);
    })
    if(newTransaction.transactionFare>initialbal) {
        return{
            success: false,
            message: "Insufficient balance"
        }
    }
    const balance = initialbal - newTransaction.transactionFare
    const data = [newTransaction.cardUUID, initialbal, newTransaction.transactionFare, balance];
    await connection.promise().query("UPDATE CARDS SET cardBalance=? WHERE cardUUID=?", [balance, newTransaction.cardUUID]).then(results=>{
        if(results[0].affectedRows < 1){
            return{
                success: false,
                message: "Transaction failed",
                err: err.message
            }
        }
    }).catch(err=> {
        return{
            success: false,
            message: "Transaction failed",
            err: err.message
        }
    })
    return connection.promise().query("INSERT INTO TRANSACTIONS(cardUUID, initialBalance, transportFare, newBalance) VALUES (?,?,?,?)", data).then((results)=>{
        return{
            success: true,
            message: "New Transaction made",
            data: {
                transactionId: results[0].insertId,
                initialBalanace: initialbal,
                newBalance: balance,
                ...newTransaction
            }
        }
    }).catch((err)=>{
        return{
            success: false,
            message: "Invalid details",
            db_error: err.message
        }
    })
}

const getTransactionById = (transactionId)=>{
    return connection.promise().query("SELECT * FROM TRANSACTIONS WHERE transactionId = "+transactionId).then((results)=> {
        return {
            success: true,
            message: "Transactions by ID",
            data: {
                transactionId: results[0]
            }
        }
    }).catch((err)=> {
        return {
            success: false,
            message: "Invalid Id",
            db_error: err.message
        };
    })
}

const getTransactionByCardUUID = (cardUUID)=>{
    return connection.promise().query("SELECT * FROM TRANSACTIONS WHERE cardUUID ='"+cardUUID+"'").then((results)=> {
        return {
            success: true,
            message: "Transaction By UUID",
            data: {
                cardUUID: results[0]
            }
        }
    }).catch((err)=> {
        return {
            success: false,
            message: "Invalid details",
            db_error: err.message
        };
    })
}

const getAllTransactions = ()=>{
    return connection.promise().query("SELECT * FROM TRANSACTIONS").then((results)=> {
        return {
            success: true,
            message: "All Transactions made",
            data: results[0]
        }
    }).catch((err)=> {
        return {
            success: false,
            message: "Unknown error",
            db_error: err.message
        };
    })
}

const deleteTransactionById = (transactionId)=>{
    return connection.promise().query("DELETE FROM TRANSACTIONS WHERE transactionId =" + transactionId).then((results)=> {
        return {
            success: true,
            message: "Transaction Was Deleted",
            // data: {
            //     cardId: results[0]
            // }
        }
    }).catch((err)=> {
        return {
            success: false,
            message: "Invalid UUID",
            db_error: err.message
        };
    })
}

const deleteTransactionByUUID = (transactionUUID)=>{
    return connection.promise().query("DELETE FROM TRANSACTIONS WHERE transactionUUID ='"+transactionUUID+"'").then((results)=> {
        return {
            success: true,
            message: "Transaction Was Deleted",
            // data: {
            //     cardId: results[0]
            // }
        }
    }).catch((err)=> {
        return {
            success: false,
            message: "Invalid UUID",
            db_error: err.message
        };
    })
}

module.exports = {
    createTransaction,
    getTransactionById,
    getTransactionByCardUUID,
    getAllTransactions,
    deleteTransactionById,
    deleteTransactionByUUID
}
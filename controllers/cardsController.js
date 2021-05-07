const {connection} = require("../database/index")
const Joi = require("joi")

function cardValid(cardObject) {
    const schema = Joi.object({
    
        cardUUID: Joi.string().min(3).max(50).required(),
        cardBalance: Joi.number().min(0).required(),
        customerFirstName: Joi.string().min(3).max(40).required(),
        customerLastName: Joi.string().min(3).max(40).required()
    })
    return schema.validate(cardObject)
}

const createCard = (newCard) => {
    const validate = cardValid(newCard)
    if(validate.error) {
        return {
            success: false,
            message: "Invalid details!",
            err: validate.error.details
        }
    }
    const data = [newCard.cardUUID, newCard.cardBalance, newCard.customerFirstName, newCard.customerLastName];
    return connection.promise().query("INSERT INTO CARDS(cardUUID,cardBalance,customerFristName,customerLastName) VALUES(?,?,?,?)", data).then((results)=> {
        return {
            success: true,
            message: "Card Registered",
            data: {
                cardId: results[0].insertId,
                ...newCard
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

const getCardById = (cardId)=>{
    return connection.promise().query("SELECT * FROM CARDS WHERE cardId = "+cardId).then((results)=> {
        return {
            success: true,
            message: "Card by ID",
            data: {
                cardId: results[0]
            }
        }
    }).catch((err)=> {
        return {
            success: false,
            message: "Invalid ID",
            db_error: err.message
        };
    })
}

const getCardByUUID = (cardUUID)=>{
    return connection.promise().query("SELECT * FROM CARDS WHERE cardUUID ='"+cardUUID+"'").then((results)=> {
        return {
            success: true,
            message: "Card By UUID",
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

const getAllCards = ()=>{
    return connection.promise().query("SELECT * FROM CARDS").then((results)=> {
        return {
            success: true,
            message: "All registerd cards",
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

const addMoney = (cardUUID, amount)=>{
    
}

const deleteCardById = (cardId)=>{
    return connection.promise().query("DELETE FROM CARDS WHERE cardId =" + cardId).then((results)=> {
        return {
            success: true,
            message: "Card Was Deleted",
            // data: {
            //     cardId: results[0]
            // }
        }
    }).catch((err)=> {
        return {
            success: false,
            message: "Invalid details",
            db_error: err.message
        };
    })
}

const deleteCardByUUID = (cardUUID)=>{
    return connection.promise().query("DELETE FROM CARDS WHERE cardUUID ='"+cardUUID+"'").then((results)=> {
        return {
            success: true,
            message: "Card Was Deleted",
            // data: {
            //     cardId: results[0]
            // }
        }
    }).catch((err)=> {
        return {
            success: false,
            message: "Invalid details",
            db_error: err.message
        };
    })
}

module.exports = {
    createCard,
    getCardById,
    getCardByUUID,
    getAllCards,
    addMoney,
    deleteCardById,
    deleteCardByUUID
}
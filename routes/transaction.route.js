const { createTransaction, getAllTransactions, getTransactionById, getTransactionByCardUUID, deleteTransactionById, deleteTransactionByUUID } = require("../controllers/transactionController")

const router = require("express").Router()

router.post("/newTransaction", async (req, res)=>{
    const results = await createTransaction(req.body)
    return res.send(results)
})

router.get("/getAllTransactions", async (req, res)=>{
    const results = await getAllTransactions()
    return res.send(results)
})

router.get("/getTransactionById/:getTransactionById", async (req, res)=>{
    const results = await getTransactionById(req.params.getTransactionById)
    return res.send(results)
})

router.get("/getTransactionByCardUUID/:getTransactionByCardUUID", async (req, res)=>{
    const results = await getTransactionByCardUUID(req.params.getTransactionByCardUUID)
    return res.send(results)
})


router.delete("/deleteTransactionById/:deleteTransactionById", async (req, res)=>{
    const results = await deleteTransactionById(req.params.deleteTransactionById)
    return res.send(results)
})


router.delete("/deleteTransactionByUUID/:deleteTransactionByUUID", async (req, res)=>{
    const results = await deleteTransactionByUUID(req.params.deleteTransactionByUUID)
    return res.send(results)
})

module.exports = router
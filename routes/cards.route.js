const { createCard, getAllCards, getCardById, getCardByUUID, deleteCardById, deleteCardByUUID } = require("../controllers/cardsController")

const router = require("express").Router()

router.post("/new-card", async (req, res)=>{
    const results = await createCard(req.body)
    return res.send(results)
})

// router.get("/byId/:id", async (req, res)=>{
//     const results = await createCard(req.body)
//     return res.send(results)
// })

router.get("/all", async (req, res)=>{
    const results = await getAllCards()
    return res.send(results)
})

router.get("/getCardById/:getCardById", async (req, res)=>{
    const results = await getCardById(req.params.getCardById)
    return res.send(results)
})

router.get("/getCardByUUID/:getCardByUUID", async (req, res)=>{
    const results = await getCardByUUID(req.params.getCardByUUID)
    return res.send(results)
})

router.get("/getAllCards", async (req, res)=>{
    const results = await getAllCards()
    return res.send(results)
})

router.delete("/deleteCardById/:deleteCardById", async (req, res)=>{
    const results = await deleteCardById(req.params.deleteCardById)
    return res.send(results)
})


router.delete("/deleteCardByUUID/:deleteCardByUUID", async (req, res)=>{
    const results = await deleteCardByUUID(req.params.deleteCardByUUID)
    return res.send(results)
})

module.exports = router
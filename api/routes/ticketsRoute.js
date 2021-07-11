const express = require("express");
const router = express.Router();
const Tickets = require("../models/tickets/ticketModel");
const { userAuthorization } = require("../middleware/userAuthorization")
const  { createPostValidation,updatePostValidation } = require("../middleware/formValidation")


router.post("/",createPostValidation, userAuthorization, async (req, res) => {
    const { subject, message, messageBy } = req.body;
    const userId = req.userId;
    try {
        const newTicket = new Tickets({
            clientId: userId,
            subject,
            conversation: [
                {
                    message,
                    messageBy
                }
            ]
        });
        const result = await newTicket.save()
            .then(() => res.status(200).json({ status: "success", message: "New Ticket created successfully" }))
            .catch(err => res.status(500).json({ status: "error", message: err.message }))

    } catch (error) {
        return res.status(500).json(error.message)
    }
})


router.get("/", userAuthorization, async (req, res) => {
    const clientId = req.userId;
    try {
        const getTicketsById = await Tickets.find({ clientId })
            .then(getTicketsById => res.json(getTicketsById))
            .catch(err => res.status(500).json(err.message))
    } catch (error) {
        return res.status(500).json(error.message)
    }
})

router.put("/:id", updatePostValidation,userAuthorization, async (req, res) => {
    const clientId = req.userId;
    const { id } = req.params;
    const { message, messageBy } = req.body;
    try {
        await Tickets.findByIdAndUpdate({ _id: id,clientId },
            {
                status: "pending operator response",
                $push: {
                    conversation: {
                        message,
                        messageBy
                    }
                }
            },
            { new: true })
            .then(() => res.status(200).json({ status: "success", message: "Message updated" }))
            .catch(err => res.status(500).json({ status: "error", message: err.message }))
    } catch (error) {
        return res.status(500).json(error.message)
    }
})

router.patch("/close-ticket/:id", userAuthorization, async (req, res) => {
    const clientId = req.userId;
    const { id } = req.params;
    try {
        await Tickets.findByIdAndUpdate({ _id: id,clientId },
            {
                status: "closed",
            },
            { new: true })
            .then(() => res.status(200).json({ status: "success", message: "Ticket Closed" }))
            .catch(err => res.status(500).json({ status: "error", message: err.message }))
    } catch (error) {
        return res.status(500).json(error.message)
    }
})


router.get("/:id", userAuthorization, async (req, res) => {
    const clientId = req.userId;
    const { id } = req.params;
    try {
        await Tickets.findById({ _id: id, clientId })
            .then(ticket => res.json(ticket))
            .catch(err => res.status(500).json(err.message))
    } catch (error) {
        return res.status(500).json(error.message)
    }
})


router.delete("/:id", userAuthorization, async (req, res) => {
    const clientId = req.userId;
    const { id } = req.params;
    try {
        await Tickets.findOneAndDelete({ _id: id, clientId })
        .then(() => res.status(200).json({ status: "success", message: "Deleted Successfully" }))
        .catch(err => res.status(500).json({ status: "error", message: err.message }))
    } catch (error) {
        return res.status(500).json(error.message)
    }
})

module.exports = router;

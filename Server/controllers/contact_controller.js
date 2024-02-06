const CONTACT = require("../models/contactModel");

exports.contact = {
    get: async (req, res) => {
        try {
            const contact = await CONTACT.find({});
            if (contact.length > 0) {
                return res.status(200).json({
                    isSuccess: true,
                    message: "All contacts data",
                    data: contact
                });
            } else {
                return res.ststus(400).json({
                    message: "contacts are not found !"
                });
            }
        } catch (error) {
            return res.json({ data: error, message: 'Request failed !' });
        }
    },
    add: async (req, res) => {
        try {
            let { name, email,message } = req.body;
           
            if (!(name && email && message)) {
                return res.send({ isSuccess: false, message: 'All input is required.' })
            }
            const contactObj = {
                name: name,
                email: email,
                message:message    
            }
            const contact = await CONTACT.create(contactObj);
            if (contact) {
                return res.status(200).json({
                    isSuccess: true,
                    message: "contact created Successfully",
                    data: contact,
                });
            } else {
                return res.status(400).json({
                    isSuccess: false,
                    message: "some error while creating contact !",
                });
            }
        } catch (error) {
            return res.json({ data: error, message: 'Request failed !' });
        }
    },
    delete: async (req, res) => {
        const id = req.params.id;
        try {
            if (!id) {
                return res.json({
                    message: "Id not found",
                    isSuccess: false,
                });
            } else {
                const contact = await CONTACT.findByIdAndDelete({ _id: id });
                if (contact) {
                    return res.json({
                        message: "contact Deleted !",
                        isSuccess: true,
                    })
                } else {
                    return res.json({
                        message: `cannot delete data with id=${id}. `,
                        isSuccess: false,
                    })
                }
            }
        } catch (error) {
            return res.json({ data: error, message: 'Request failed !' });
        }
    },
}
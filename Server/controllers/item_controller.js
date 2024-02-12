const ITEM = require("../models/itemModel");

exports.item = {
    get: async (req, res) => {
        try {
            const item = await ITEM.find({});
            if (item.length > 0) {
                return res.status(200).json({
                    isSuccess: true,
                    message: "All items data",
                    data: item
                });
            } else {
                return res.ststus(400).json({
                    message: "items are not found !"
                });
            }
        } catch (error) {
            return res.json({ data: error, message: 'Request failed !' });
        }
    },
    getById: async (req, res) => {
        const id = req.params.id;
        try {
            const item = await ITEM.findById({ _id: id });
            if (item) {
                return res.status(200).json({
                    isSuccess: true,
                    message: "Item find Successfully.",
                    data: item
                })
            } else {
                return res.status(400).json({
                    isSuccess: false,
                    message: "Item not found!!",
                    data: item
                });
            }
        } catch (error) {
            return res.json({ data: error, message: 'Request failed !' });

        }
    },
    add: async (req, res) => {
        try {
            let { name, price, category, } = req.body;
            console.log(req.file)
            if (!(name && price && category && req.file)) {
                return res.send({ isSuccess: false, message: 'All input is required.' })
            }

            const itemObj = {
                name: name,
                price: price,
                category: category,
                imagename: 'https://food-server.cyclic.app/' + req.file.path
            }
            const item = await ITEM.create(itemObj);
            if (item) {
                return res.status(200).json({
                    isSuccess: true,
                    message: "Item created Successfully",
                    data: item,
                });
            } else {
                return res.status(400).json({
                    isSuccess: false,
                    message: "some error while creating item !",
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
                const item = await ITEM.findByIdAndDelete({ _id: id });
                if (item) {
                    return res.json({
                        message: "Item Deleted !",
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
    edit: async (req, res) => {
        try {
            let { name, price, category } = req.body;
            const itemid = req.params.id;
            console.log('updatedItem', res)
            console.log(req.file);
            let updatedItem = await ITEM.findByIdAndUpdate(
                { _id: itemid },
                {
                    $set: {
                        name: name,
                        category: category, 
                        price: price,
                        imagename: 'https://food-server.cyclic.app/' + req.file.path
                    }
                }
            );


            if (!updatedItem) {
                return res.status(404).json({
                    message: 'Item not found'
                }); 
            }
            return res.status(200).json({
                isSuccess: true,
                message: "Item updated successfully",
                data: updatedItem,
            });

        } catch (error) {
            return res.json({ data: error, message: 'Request failed !' });
        }
    }
} 
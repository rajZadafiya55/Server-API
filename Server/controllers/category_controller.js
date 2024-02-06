const CATEGORY = require("../models/categoryModel");

exports.category = {
    get: async (req, res) => {
        try {
            const category = await CATEGORY.find({});
            if (category.length > 0) {
                return res.status(200).json({
                    isSuccess: true,
                    message: "All categorys data",
                    data: category
                });
            } else {
                return res.ststus(400).json({
                    message: "categorys are not found !"
                });
            }
        } catch (error) {
            return res.json({ data: error, message: 'Request failed !' });
        }
    },
    add: async (req, res) => {
        try {
            let { category } = req.body;
            if (!category) {
                return res.send({ isSuccess: false, message: 'All input is required.' })
            }
            const result = await CATEGORY.create({category:category});
            if (result) {
                return res.status(200).json({
                    isSuccess: true,
                    message: "category created Successfully",
                    data: result,
                });
            } else {
                return res.status(400).json({
                    isSuccess: false,
                    message: "some error while creating category !",
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
                const category = await CATEGORY.findByIdAndDelete({ _id: id });
                if (category) {
                    return res.json({
                        message: "category Deleted !",
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
            
            let { category } = req.body;
            const categoryid = req.params.id;

            let catgy = await CATEGORY.findByIdAndUpdate(
                { _id: categoryid },
                {
                    $set: {
                        category: category,    
                    }
                }
            );
            if (!catgy) {
                return res.status(404).json({
                    message: 'category not found'
                }); 
            }
            return res.status(200).json({
                isSuccess: true,
                message: "category updated successfully",
                data: catgy,
            });

        } catch (error) {
            return res.json({ data: error, message: 'Request failed !' });
        }
    }
} 
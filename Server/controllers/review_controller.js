const REVIEW = require("../models/reviewModel");

exports.review = {
    get: async (req, res) => {
        try {
            const review = await REVIEW.find({});
            if (review.length > 0) {
                return res.status(200).json({
                    isSuccess: true,
                    message: "All reviews data",
                    data: review
                });
            } else {
                return res.ststus(400).json({
                    message: "reviews are not found !"
                });
            }
        } catch (error) {
            return res.json({ data: error, message: 'Request failed !' });
        }
    },
    add: async (req, res) => {
        try {
            let { name, description } = req.body;
           
            if (!(name && description)) {
                return res.send({ isSuccess: false, message: 'All input is required.' })
            }
            const reviewObj = {
                name: name,
                description: description,    
            }
            const review = await REVIEW.create(reviewObj);
            if (review) {
                return res.status(200).json({
                    isSuccess: true,
                    message: "review created Successfully",
                    data: review,
                });
            } else {
                return res.status(400).json({
                    isSuccess: false,
                    message: "some error while creating review !",
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
                const review = await REVIEW.findByIdAndDelete({ _id: id });
                if (review) {
                    return res.json({
                        message: "Review Deleted !",
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
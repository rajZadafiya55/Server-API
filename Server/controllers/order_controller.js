const ORDER = require("../models/orderModel");

exports.order = {
    get: async (req, res) => {
        try {
            const order = await ORDER.find({});
            if (order.length > 0) {
                return res.status(200).json({
                    isSuccess: true,
                    message: "All orders data",
                    data: order
                });
            } else {
                return res.ststus(400).json({
                    message: "orders are not found !"
                });
            }
        } catch (error) {
            return res.json({ data: error, message: 'Request failed !' });
        }
    },
    getById: async (req, res) => {
        const id = req.params.id;
        try {
            const order = await ORDER.findById({ _id: id });
            if (order) {
                return res.status(200).json({
                    isSuccess: true,
                    message: "order find Successfully.",
                    data: order
                })
            } else {
                return res.status(400).json({
                    isSuccess: false,
                    message: "order not found!!",
                    data: order
                });
            }
        } catch (error) {
            return res.json({ data: error, message: 'Request failed !' });

        }
    },
    add: async (req, res) => {
        console.log(req.body)
        try {
            const { username, table_no, discount, total_amt,qty,descreption } = req.body;
            if (!(username && table_no && discount && total_amt,qty)) {
                return res.send({ isSuccess: false, message: 'All input is required.' })
            } 
            const  orderObj = { 
                username:username, 
                table_no:table_no, 
                discount:discount, 
                total_amt :total_amt,
                qty:qty,
                descreption:descreption
            };
            const order = await ORDER.create(orderObj);
           
            if (order) {
                return res.status(200).json({
                    isSuccess: true,
                    message: "order created Successfully",
                    data: order,
                });
            } else {
                return res.status(400).json({
                    isSuccess: false,
                    message: "some error while creating order !",
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
                const order = await ORDER.findByIdAndDelete({ _id: id });
                if (order) {
                    return res.json({
                        message: "order Deleted !",
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
    }
} 
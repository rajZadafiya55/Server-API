const PAYMENT = require("../models/paymentModel");

exports.payment = {
    get: async (req, res) => {
        try {
            const payment = await PAYMENT.find({});
            if (payment.length > 0) {
                return res.status(200).json({
                    isSuccess: true,
                    message: "All payments data",
                    data: payment
                });
            } else {
                return res.ststus(400).json({
                    message: "payments are not found !"
                });
            }
        } catch (error) {
            return res.json({ data: error, message: 'Request failed !' });
        }
    },
    getById: async (req, res) => {
        const id = req.params.id;
        try {
            const payment = await PAYMENT.findById({ _id: id });
            if (payment) {
                return res.status(200).json({
                    isSuccess: true,
                    message: "payment find Successfully.",
                    data: payment
                })
            } else {
                return res.status(400).json({
                    isSuccess: false,
                    message: "payment not found!!",
                    data: payment
                });
            }
        } catch (error) {
            return res.json({ data: error, message: 'Request failed !' });

        }
    },
    add: async (req, res) => {
        console.log(req.body)
        try {
            const { cardNumber,phone, expirationDate, cvv, amount } = req.body;
            if (!(cardNumber && phone && expirationDate && cvv && amount)) {
                return res.send({ isSuccess: false, message: 'All input is required.' })
            } 
            const  paymentObj = { 
                cardNumber:cardNumber, 
                phone:phone,
                expirationDate:expirationDate, 
                cvv:cvv, 
                amount :amount
            };
            const payment = await PAYMENT.create(paymentObj);
           
            if (payment) {
                return res.status(200).json({
                    isSuccess: true,
                    message: "payment created Successfully",
                    data: payment,
                });
            } else {
                return res.status(400).json({
                    isSuccess: false,
                    message: "some error while creating payment !",
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
                const payment = await PAYMENT.findByIdAndDelete({ _id: id });
                if (payment) {
                    return res.json({
                        message: "payment Deleted !",
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
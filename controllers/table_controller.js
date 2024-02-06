const TABLE  = require('../models/tableModel');

exports.table = {
    get: async (req, res) => {
        try {
            const tables = await TABLE.find({});
            if (tables.length > 0) {
                return res.status(200).json({
                    isSuccess: true,
                    message: "All tables data",
                    data: tables
                });
            } else {
                return res.ststus(400).json({
                    message: "tables are not found !"
                });
            }
        } catch (error) {
            return res.json({ data: error, message: 'Request failed !' });
        }
    },
    add: async (req, res) => {
        console.log(req.body)     
        try {
            var { table } = req.body;   
            if (!(table)) {
                return res.send({ isSuccess: false, message: 'table is required.' })
            }
            const tableData = await TABLE.create({table});
            if (tableData) {
                return res.status(200).json({
                    isSuccess: true,
                    message: "table created Successfully",
                    data: tableData,
                });
            } else {
                return res.status(400).json({
                    isSuccess: false,
                    message: "some error while creating table !",
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
                const tableD = await TABLE.findByIdAndDelete({ _id: id });
                if (tableD) {
                    return res.json({
                        message: "table Deleted !",
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
            let { table } = req.body;
            const tableid = req.params.id;

            let tableData = await TABLE.findByIdAndUpdate(
                { _id: tableid },
                {
                    $set: {
                        table: table,
                    }
                }
            );
            if (!tableData) {
                return res.status(404).json({
                    message: 'Table not found'
                }); 
            }
            return res.status(200).json({
                isSuccess: true,
                message: "Table updated successfully",
                data: tableData,
            });

        } catch (error) {
            return res.json({ data: error, message: 'Request failed !' });
        }
    }
}
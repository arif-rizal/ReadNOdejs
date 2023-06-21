


// const response = () => {
//     return {
//         payload: {
//             status_code: "",
//             datas: "",
//             massage: ""
//         },
//         pagination: {
//             prev: "",
//             next: "",
//             max: ""
//         }
//     }
// }

// module.exports = response


const response = (statuscode, data, massage, res) => {
    res.status(statuscode).json({
        payload: {
            status_code: statuscode,
            datas: data,
            massage: massage
        },
        pagination: {
            prev: "",
            next: "",
            max: ""
        }
    })
}

module.exports = response
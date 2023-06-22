// ###################### awal 2 ####################### \\


// const response = (statusCode, data, messange, res) => {
//     res.status(statusCode).json({
//         payload: {
//             status_code: statusCode,
//             datas: data,
//             messange: messange,
//         },
//         pagination: {
//             prev: "",
//             next: "",
//             max: ""
//         }
//     })
// }

// module.exports = response


// ###################### akhir 2 ####################### \\


const response = (statusCode, data, messange, res) => {
    res.send(statusCode, [
      {
        data, 
        messange,
        metadata: {
            prev: "",
            next: "",
            current: ""
        }
      }  
    ])
}

module.exports = response
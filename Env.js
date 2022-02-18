/*
const serverCrm = 'https://pdtclientsolutions.com/telesaludapp/api'
const file_server1 =  'https://pdtclientsolutions.com/telesaludapp'
const serverCrmTestDrawer="http://31.220.60.218:3000"
//const serverCrmTestDrawer="http://localhost:3000"
const base_url = function base_url(server, uri){ return `${server}/${uri}` }
export  { base_url, serverCrm, file_server1, serverCrmTestDrawer,}
*/

///////////////////////////////////////////////////////////
// const server1 = 'http://192.168.1.120:8000/api'
// const file_server1 =  'http://192.168.1.120:8000'
const serverCrm = 'https://pdtclientsolutions.com/wellezy/api'
const file_server1 =  'https://pdtclientsolutions.com/wellezy'
const serverAmadeus = 'http://192.168.1.150:4010/api'
const token_wompi = "pub_prod_a9LjCZKfzlyDwZFQJPHcrUkBsqctdmli"
//const token_wompi = "pub_test_jDc8Fwgxbbr1shC1Qc12kUL9bcVlR3xh"
const ApiWompi = "https://production.wompi.co/v1/"
//const ApiWompi = "https://sandbox.wompi.co/v1/"
const base_url = function base_url(server, uri){
    return `${server}/${uri}`
}
const serverCrmTestDrawer="http://31.220.60.218:3000"
//const serverCrmTestDrawer="http://localhost:3000"
export  {
    base_url,
    serverCrm,
    serverAmadeus,
    file_server1,
    ApiWompi,
    token_wompi,
    serverCrmTestDrawer,
}
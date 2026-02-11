export class APIUtils
{
apiContext:any;
loginPayload:string;

    constructor(apiContext:any,loginPayload:string)
    {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }

    async getToken()
    {
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {
         data:this.loginPayload
        })
        
        const loginReponseJson = await loginResponse.json();
        const token = loginReponseJson.token; //to grab token from json response. here response is containing - { token, userid, password}
        console.log("toekn is:"+token);
        return token;
    }

    async createOrder(orderPayload:string)
    {
        let response={token:String, orderId:String}; //like POJO class we are using this response json object to store token and orderId values
response.token = await this.getToken();
        const orderResponse= await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
               data:orderPayload,
               headers:{
                            'Authorization':response.token,
                            'Content-Type' : 'application/json'
                       }
            }
        )
        
        const orderResponseJson = await orderResponse.json();
        console.log(orderResponseJson);
        const orderId1 = orderResponseJson.orders[0]; 
        response.orderId = orderId1;

        return response;
    }



}

module.exports = {APIUtils};
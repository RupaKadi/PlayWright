class OrdersPage{
    constructor(page){
        this.page = page;
        this.ordersTable = page.locator("tbody");
        this.tablerows = page.locator("tbody tr");
        this.orderdIdDetails =page.locator(".col-text");
    }

    async searchOrderAndSelect(orderId)
    {
        await this.ordersTable.waitFor();
        for(let i=0;i<await this.tablerows.count();++i)
            {
                const orderIdfromTable = await this.tablerows.nth(i).locator("th").textContent();
            if(orderId.includes(orderIdfromTable))
            {
                await this.tablerows.nth(i).locator("button").first().click();
                break;
            }
            }
    }

    async getOrderIdDetails()
    {
        return await this.orderdIdDetails.textContent();
    }
}

module.exports={OrdersPage};
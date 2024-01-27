import cheerio from 'cheerio';
export const GetProductImg = async (response: any) => {
    const $ = cheerio.load(response.data);
    const item = $('.s-item s-item__pl-on-bottom');
    // Extract the image URLs
    const titleDiv = item.find('.s-item__title');
    
    // const imageUrls = item.find('img').map((index, element) => $(element).attr('src')).get();
    const itemTitle = item.find('.s-item__title').map((index, element) => 
    {
        let span = $(element).find('span')
        return span.text
    })
    console.log(itemTitle);
    return itemTitle;
} 
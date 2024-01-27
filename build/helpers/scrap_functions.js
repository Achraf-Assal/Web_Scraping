"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetProductImg = void 0;
const cheerio_1 = __importDefault(require("cheerio"));
const GetProductImg = (response) => __awaiter(void 0, void 0, void 0, function* () {
    const $ = cheerio_1.default.load(response.data);
    const item = $('.s-item s-item__pl-on-bottom');
    // Extract the image URLs
    const titleDiv = item.find('.s-item__title');
    // const imageUrls = item.find('img').map((index, element) => $(element).attr('src')).get();
    const itemTitle = item.find('.s-item__title').map((index, element) => {
        let span = $(element).find('span');
        return span.text;
    });
    console.log(itemTitle);
    return itemTitle;
});
exports.GetProductImg = GetProductImg;

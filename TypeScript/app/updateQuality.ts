import { Item } from "./item";

const MAXIMUM_QUALITY = 50;
const MINIMUM_QUALITY = 0;

const isLessThanMaximum = quality => quality < MAXIMUM_QUALITY;
const isOverMinimum = quality => quality > MINIMUM_QUALITY;

const increaseQuality = quality => isLessThanMaximum(quality) ? quality + 1 : quality;
const decreaseQuality = quality => isOverMinimum(quality) ? quality - 1 : quality;

const updateItemQuality = (item): Item => {
    item.quality = decreaseQuality(item.quality);
    item.quality = item.sellIn <= 0 ? decreaseQuality(item.quality) : item.quality;

    return item;
};

export const updateQualityForGeneralItem = (item): Item => {
    item = updateItemQuality(item);
    item.sellIn -= 1;

    return item;
};

export const updateQualityForAgedBrie = (item): Item => {
    item.quality = increaseQuality(item.quality);
    item.quality = item.sellIn < 0 ? increaseQuality(item.quality) : item.quality;
    item.sellIn -= 1;

    return item;
};

const increaseQualityForConcert = (item: Item): number => {
    let quality = increaseQuality(item.quality);
    quality = item.sellIn < 11 ? increaseQuality(quality) : quality;
    quality = item.sellIn < 6 ? increaseQuality(quality) : quality;

    return quality;
};

export const updateQualityForConcert = (item): Item => {
    item.quality = item.sellIn === 0 ? 0 : increaseQualityForConcert(item);
    item.sellIn -= 1;

    return item;
};

export const updateQualityForSulfuras = (item: Item): Item => {
    item.quality = 80;

    return item;
};
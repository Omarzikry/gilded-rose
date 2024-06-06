import { Item } from "./item";

const MAXIMUM_QUALITY = 50;
const MINIMUM_QUALITY = 0;
const SULFURAS_QUALITY = 80;

const isLessThanMaximum = (quality: number): boolean => quality < MAXIMUM_QUALITY;
const isOverMinimum = (quality: number): boolean => quality > MINIMUM_QUALITY;

const increaseQuality = (quality: number): number => isLessThanMaximum(quality) ? quality + 1 : quality;
const decreaseQuality = (quality: number): number => isOverMinimum(quality) ? quality - 1 : quality;

const updateItemQuality = (item: Item): Item => {
    item.quality = decreaseQuality(item.quality);
    item.quality = item.sellIn <= 0 ? decreaseQuality(item.quality) : item.quality;

    return item;
};

const decreaseSellIn = (item: Item): Item => {
    item.sellIn -= 1;
    return item;
};

export const updateQualityForGeneralItem = (item: Item): Item => {
    item = updateItemQuality(item);
    item = decreaseSellIn(item);

    return item;
};


export const updateQualityForAgedBrie = (item: Item): Item => {
    item.quality = increaseQuality(item.quality);
    item.quality = item.sellIn < 0 ? increaseQuality(item.quality) : item.quality;
    item = decreaseSellIn(item);

    return item;
};

const increaseQualityForConcert = (item: Item): number => {
    let quality = increaseQuality(item.quality);
    quality = item.sellIn < 11 ? increaseQuality(quality) : quality;
    quality = item.sellIn < 6 ? increaseQuality(quality) : quality;

    return quality;
};

export const updateQualityForConcert = (item: Item): Item => {
    item.quality = item.sellIn === 0 ? 0 : increaseQualityForConcert(item);
    item = decreaseSellIn(item);

    return item;
};

export const updateQualityForSulfuras = (item: Item): Item => {
    item.quality = SULFURAS_QUALITY;

    return item;
};

export const updateQualityForConjured = (item: Item): Item => {
    item = updateItemQuality(item);
    item = updateItemQuality(item);
    item = decreaseSellIn(item);

    return item;
};

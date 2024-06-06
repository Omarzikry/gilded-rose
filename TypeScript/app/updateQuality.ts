const MAXIMUM_QUALITY = 50;
const MINIMUM_QUALITY = 0;

const isLessThanMaximum = quality => quality < MAXIMUM_QUALITY;
const isOverMinimum = quality => quality > MINIMUM_QUALITY;

const increaseQuality = quality => isLessThanMaximum(quality) ? quality + 1 : quality;
const decreaseQuality = quality => isOverMinimum(quality) ? quality - 1 : quality;
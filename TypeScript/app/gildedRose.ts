import { Item } from "./item";
import { updateQualityForAgedBrie, updateQualityForGeneralItem } from "./updateQuality";

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality(): Item[] {
    this.items.forEach(currentItem => {
      switch (currentItem.name) {
        case 'Aged Brie':
          currentItem = updateQualityForAgedBrie(currentItem);
          break;
        case 'Backstage passes to a TAFKAL80ETC concert':
          // add backstage update function
          break;
        case 'Sulfuras, Hand of Ragnaros':
          // add sulfuras update function
          break;
        case 'Conjured':
          // add conjured update function
          break;
        default:
          currentItem = updateQualityForGeneralItem(currentItem);
      }

    });

    return this.items;
  }
}

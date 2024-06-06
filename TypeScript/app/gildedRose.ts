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
        default:
          currentItem = updateQualityForGeneralItem(currentItem);
      }

    });

    return this.items;
  }
}

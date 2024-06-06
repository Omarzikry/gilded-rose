import { GildedRose } from '@/gildedRose';
import { Item } from '@/item';

describe('Gilded Rose', () => {
  it('should foo', () => {
    const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('foo');
  });
});


describe('quality rules', () => {
  it('should update quality for sellin 1 day', () => {
    const gildedRose = new GildedRose([new Item('foo', 1, 1)]);
    const items = gildedRose.updateQuality();
    const updatedItem = items[0];
    expect(updatedItem.quality).toBe(0);
    expect(updatedItem.sellIn).toBe(0);
  });

  it('should update quality 2x as fast for sellin 0 days', () => {
    const gildedRose = new GildedRose([new Item('foo', 0, 4)]);
    const items = gildedRose.updateQuality();
    const updatedItem = items[0];
    expect(updatedItem.quality).toBe(2);
    expect(updatedItem.sellIn).toBe(-1);
  });

  it('should ensure quality never goes below 0', () => {
    const gildedRose = new GildedRose([new Item('foo', 0, 1)]);
    const items = gildedRose.updateQuality();
    const updatedItem = items[0];
    expect(updatedItem.quality).toBe(0);
    expect(updatedItem.sellIn).toBe(-1);
  });
});

describe('aged brie quality', () => {
  it('quality of Aged Brie goes up', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 1, 1)]);
    const updatedItems = gildedRose.updateQuality();
    const updatedItem = updatedItems[0];
    expect(updatedItem.quality).toBe(2);
    expect(updatedItem.sellIn).toBe(0);
  });

  it('quality should not go over 50', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 1, 50)]);
    const updatedItems = gildedRose.updateQuality();
    const updatedItem = updatedItems[0];
    expect(updatedItem.quality).toBe(50);
    expect(updatedItem.sellIn).toBe(0);
  });

  it('should allow quality of aged brie to be incremented up to 50', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', -10, 10)]);
    const updatedItems = gildedRose.updateQuality();
    const updatedItem = updatedItems[0];
    expect(updatedItem.quality).toBe(12);
    expect(updatedItem.sellIn).toBe(-11);
  });
});

describe('backstage pass quality rules', () => {
  it('should increase quality of backstage passes by 1 when more than 10 days remaining', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 11, 1)]);
    const updatedItems = gildedRose.updateQuality();
    const updatedItem = updatedItems[0];
    expect(updatedItem.quality).toBe(2);
    expect(updatedItem.sellIn).toBe(10);
  });

  it('should increase quality of backstage passes by 2 when 10 or less days remaining', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 6, 1)]);
    const updatedItems = gildedRose.updateQuality();
    const updatedItem = updatedItems[0];
    expect(updatedItem.quality).toBe(3);
    expect(updatedItem.sellIn).toBe(5);
  });

  it('should increase quality of backstage passes by 3 when 5 days or less remaining', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 3, 1)]);
    const updatedItems = gildedRose.updateQuality();
    const updatedItem = updatedItems[0];
    expect(updatedItem.quality).toBe(4);
    expect(updatedItem.sellIn).toBe(2);
  });

  it('should update quality of backstage passes to 0 when the concert finishes', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 0, 10)]);
    const updatedItems = gildedRose.updateQuality();
    const updatedItem = updatedItems[0];
    expect(updatedItem.quality).toBe(0);
    expect(updatedItem.sellIn).toBe(-1);
  });
});
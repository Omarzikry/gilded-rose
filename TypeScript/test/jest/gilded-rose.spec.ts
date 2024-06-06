import { GildedRose } from '@/gildedRose';
import { Item } from '@/item';

describe('Gilded Rose', () => {
  it('should foo', () => {
    const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('fixme');
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

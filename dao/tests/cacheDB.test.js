const db = require('../../utils/testDB');
const dao = require('../cacheDB');

describe('Cache API test', () => {
  beforeAll(async () => db.connectToTestDB());
  afterEach(async () => db.clearTestDB());
  afterAll(async () => db.dropTestDB());

  it('create one item', async () => {
    const item = await dao.getOrCreateItem({
      params: {
        key: 'test_key'
      }
    });

    expect(item).toHaveProperty('key');
    expect(item.key).toBe('test_key');

    expect(item).toHaveProperty('value');
    expect(item.value).toEqual(expect.any(String));
    expect(item.value.length).toBe(36);

    expect(item).toHaveProperty('createdAt');

    const items = await dao.getAllItems();
    expect(items.length).toBe(1);
  });

  it('get all: empty database', async () => {
    const items = await dao.getAllItems();
    expect(items.length).toBe(0);
  });

  it('get all: different items', async () => {
    await dao.getOrCreateItem({
      params: {
        key: 'test_key_1'
      }
    });

    await dao.getOrCreateItem({
      params: {
        key: 'test_key_2'
      }
    });

    const items = await dao.getAllItems();
    expect(items.length).toBe(2);
  });

  it('create already existing item', async () => {
    const item1 = await dao.getOrCreateItem({
      params: {
        key: 'test_key'
      }
    });

    const item2 = await dao.getOrCreateItem({
      params: {
        key: 'test_key'
      }
    });

    expect(item2).toHaveProperty('key');
    expect(item2.key).toBe('test_key');

    expect(item2).toHaveProperty('value');
    expect(item2.value).toEqual(expect.any(String));
    expect(item2.value.length).toBe(36);

    expect(item2).toHaveProperty('createdAt');

    // checking that ttl is updated, but value is same
    expect(item1.value).toBe(item2.value);
    expect(item2.createdAt > item1.createdAt).toBeTruthy();

    const items = await dao.getAllItems();
    expect(items.length).toBe(1);
  });

  it('update item: no value provided', async () => {
    const result = await dao.updateItem({
      params: {
        key: 'test_key'
      },
      body: {}
    });

    expect(result).toHaveProperty('code');
    expect(result.code).toBe(400);

    expect(result).toHaveProperty('value');
    expect(result.value).toBe('Cache item value not provided');
  });

  it('update item: item not found', async () => {
    const result = await dao.updateItem({
      params: {
        key: 'test_key'
      },
      body: {
        value: 'some value'
      }
    });

    expect(result).toHaveProperty('code');
    expect(result.code).toBe(404);

    expect(result).toHaveProperty('value');
    expect(result.value).toBe('Cache item not found');
  });

  it('update item: success', async () => {
    const original = await dao.getOrCreateItem({
      params: {
        key: 'test_key'
      }
    });

    const updated = await dao.updateItem({
      params: {
        key: 'test_key'
      },
      body: {
        value: 'some value'
      }
    });

    expect(updated).toHaveProperty('key');
    expect(updated.key).toBe('test_key');

    expect(updated).toHaveProperty('value');
    expect(updated.value).toEqual('some value');

    expect(updated).toHaveProperty('createdAt');
    expect(updated.createdAt > original.createdAt).toBeTruthy();
  });

  it('delete item: item not found', async () => {
    const result = await dao.deleteItem({
      params: {
        key: 'test_key'
      }
    });

    expect(result).toHaveProperty('code');
    expect(result.code).toBe(404);

    expect(result).toHaveProperty('message');
    expect(result.message).toBe('Item not found for key: test_key');
  });

  it('delete item: success', async () => {
    await dao.getOrCreateItem({
      params: {
        key: 'test_key_1'
      }
    });
    await dao.getOrCreateItem({
      params: {
        key: 'test_key_2'
      }
    });

    const result = await dao.deleteItem({
      params: {
        key: 'test_key_1'
      }
    });

    expect(result).toHaveProperty('code');
    expect(result.code).toBe(200);

    expect(result).toHaveProperty('message');
    expect(result.message).toBe('Item deleted for key: test_key_1');

    const items = await dao.getAllItems();
    expect(items.length).toBe(1);
  });

  it('delete all items', async () => {
    await dao.getOrCreateItem({
      params: {
        key: 'test_key_1'
      }
    });
    await dao.getOrCreateItem({
      params: {
        key: 'test_key_2'
      }
    });

    const result = await dao.deleteAllItems();

    expect(result).toHaveProperty('message');
    expect(result.message).toBe('All cache items deleted');

    const items = await dao.getAllItems();
    expect(items.length).toBe(0);
  });
});

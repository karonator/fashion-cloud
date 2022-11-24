# Fashion Cloud technical assignment

## Comments

### Cache update policy

While cache max limit is reached, we delete the **latest updated** item (based on createdAt field) because of two reasons:
- This item will be automatically deleted sooner than others
- This item is "less needed", because we are updating createdAt on every cache hit

Nonetheless, this approach has significant disadvantage: usually, cache items should be invalidated and then updated...sooner, or later. Based on our policy, items, that are used constantly will be never invalidated and deleted.

Another approach is to add some autoincrement counter, and delete the first added item, ignoring the createdAt field. It this way we will always delete the **oldest** item, even if we use it frequently. 

### GET and POST methods

Usually, we shouldn't change anything on server in GET queries. In my solution get and post routes have same realization, but in production I think that I'll leave only the POST query, because it is generating the item, if it doesn't exist. But I added also GET...because it is mentioned in the assignment.

### Tests

I added only unit tests for dao layer, but in real solution there should be also some high level test, that are testing not only db interaction, but also the correct working of the whole server. I haven't done it because of lack of time.

Thank you for interesting assignment! :)
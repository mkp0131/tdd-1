class stubProductClient {
  async fetchItems() {
    return [
      { name: 'Milk1', available: true },
      { name: 'Milk2', available: false },
      { name: 'Milk3', available: false },
    ];
  }
}

module.exports = stubProductClient;

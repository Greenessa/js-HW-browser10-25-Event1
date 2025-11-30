export default class saveInStorage {
    constructor(storage) {
        this.storage = storage;
      }

    setInStorage(state) {
        this.storage.setItem('state', JSON.stringify(state));
    }

    getFromStorage() {
        try {
            return JSON.parse(this.storage.getItem('state'));
          } catch (e) {
            throw new Error('Invalid state');
          }
    }
}

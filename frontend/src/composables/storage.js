class Storage {
    set (key, value) {
        localStorage.setItem(key, value);
    }

    get (key, defaultValue) {
        return localStorage.getItem(key) ?? defaultValue;
    }
}

const StorageRepo = new Storage;
export default StorageRepo;
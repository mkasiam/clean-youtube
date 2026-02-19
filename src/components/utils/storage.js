class Storage {
  save(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  get(key) {
    const json = localStorage.getItem(key);
    return json ? JSON.parse(json) : null;
  }
}

const storage = new Storage();
export default storage;

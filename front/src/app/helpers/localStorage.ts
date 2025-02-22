export class LocalStorage {
  static salt = 'UPJV_LOCALSTORAGE';
  /**
   * @constructor
   */
  constructor() {}

  /**
   * Encrypt data and save it in local DB
   * @param string label Label of stored item
   * @param string data Stringified data to be stored
   */
  static setItem(label: string, data: string): void {
    data = data + this.salt;
    data = btoa(unescape(encodeURIComponent(data)));
    localStorage.setItem(label, data);
  }
  /**
   * Get an item from the local DB
   * @param label Label of element to be extracted
   */
  static getItem(label: string): any {
    let data = window.localStorage.getItem(label);
    if (data != null) {
      data = decodeURIComponent(escape(window.atob(data)));
      data = data.replace(this.salt, '');
      // // console.log(data);
    }
    return data;
  }
  /**
   * Remove an element from the local DB
   * @param label Label of the element to remove from the local DB
   */
  static delete(label: string): void {
    localStorage.removeItem(label);
  }
}

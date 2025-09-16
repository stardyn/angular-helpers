import * as _ from 'lodash';

export class Dicts {
  public static get(data: any, key: string): any {
    const keyLower = key.toLocaleLowerCase();

    if (_.has(data, keyLower)) return data[keyLower];

    const keyUpper = key.toLocaleUpperCase();

    if (_.has(data, keyUpper)) return data[keyUpper];

    return null;
  }

  public static getOrDefault(data: any, key: string, def: any): any {
    const keyLower = key.toLocaleLowerCase();

    if (_.has(data, keyLower)) return data[keyLower];

    const keyUpper = key.toLocaleUpperCase();

    if (_.has(data, keyUpper)) return data[keyUpper];

    return def;
  }

  public static insert(data: any[], index: number, item: any): any[] {

    const newNumbers = [
      ...data.slice(0, index),
      item,
      ...data.slice(index)
    ];

    return newNumbers;
  }

  public static RemoveDuplicates(arr: string[]): string[] {
    let s = new Set(arr);
    let it = s.values();
    return Array.from(it);
  }

  public static GetKeys(json_object: any): string[] {
    const keys = Dicts.GetAllKeys("", json_object);

    return Dicts.RemoveDuplicates(keys);
  }

  private static GetAllKeys(parentKey: string, json_object: any, ret_array: string[] = []): string[] {

    for (let json_key in json_object) {

      if (typeof (json_object[json_key]) === 'object' && !Array.isArray(json_object[json_key])) {

        const parent: string = parentKey.length > 0 ? parentKey + "." + json_key : json_key;

        ret_array.push(parent);

        this.GetAllKeys(parent, json_object[json_key], ret_array);

      } else if (Array.isArray(json_object[json_key])) {

        const parent: string = parentKey.length > 0 ? parentKey + "." + json_key : json_key;

        ret_array.push(parent);

        for (let first_element in json_object[json_key]) {

          let first_element_x = json_object[json_key][first_element];

          // console.log(`parentKey: "${parentKey}", _key: "${first_element_x}"`);

          if (typeof (first_element_x) === 'object') {
            this.GetAllKeys(parent, first_element_x, ret_array);
          }
        }

      } else {
        const parent: string = parentKey.length > 0 ? parentKey + "." + json_key : json_key;

        ret_array.push(parent);
      }
    }

    return ret_array
  }
}

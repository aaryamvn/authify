/**
	* Omits certain keys from an object.

	* Used to hide sensitive information from reaching the client.*
    
	* **Will not work on objects with keys that are not enumerable.**

	* @param o Object to use.
	
	* @param k Keys to omit.

	* @returns New object with omitted keys.
*/

export function omitKeys<O, K extends (keyof O)[]>(
  o: O,
  k: K
): Omit<O, K[number]> {
  const newObj = { ...o };

  for (const key of k) delete newObj[key];

  return newObj;
}

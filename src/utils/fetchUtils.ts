export const localFetch = (resource: string): Promise<any> => {
  return fetch(`${process.env.PUBLIC_URL}${resource}`)
    .then(resource => resource.json())
    .catch(err => err);
};

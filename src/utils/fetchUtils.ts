export const localFetch = (resource: string): Promise<any> => {
  // If in dev env we use local resources
  if(process.env.NODE_ENV === 'development') {
    return Promise.resolve(require(`../${resource}`));
  }

  return fetch(`${process.env.PUBLIC_URL}/${resource}`)
    .then(resource => resource.json())
    .catch(err => err);
};

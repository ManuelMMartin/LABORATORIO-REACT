export const fetchCharacters = async (page: number, name?: string) => {
  const url = name
    ? `https://rickandmortyapi.com/api/character/?page=${page}&name=${name}`
    : `https://rickandmortyapi.com/api/character/?page=${page}`;

  const response = await fetch(url);

  if (response.status !== 200) {
    throw new Error(`Error: ${response.status}`);
  }

  return response.json();
};

const token = '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'


export const fetchOrg = async (organizacion: string, currentPage: number, perPage: number) => {
  const url = (`https://api.github.com/orgs/${organizacion}/members?page=${currentPage}&per_page=${perPage}`)

  const response = await fetch(url, {
    headers: {
      Authorization: `token ${token}`,
    },
  });

  if (response.status !== 200) {
    throw new Error(`Error: ${response.status}`);
  }

  return response.json();
};

export const topPhotosRequest = (params: any) => ({
  type: 'API_REQUEST',
  payload: {
    text: params.text,
    page: params.page,
  },
});

export const resetPhotosData = () => ({
  type: 'RESET_DATA',
});

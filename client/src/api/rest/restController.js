import http from '../interceptor';

export const registerRequest = (data) => http.post('/api/auth/registration', data);
export const loginRequest = (data) => http.post('/api/auth/login', data);
export const getUser = () => http.post('/api/users/getUser');
export const updateContest = (data) => http.post('/api/contests/updateContest', data);
export const setNewOffer = (data) => http.post('/api/users/setNewOffer', data);
export const setOfferStatus = (data) => http.post('/api/users/setOfferStatus', data);
export const downloadContestFile = (data) => http.get(`/api/users/downloadFile/${data.fileName}`);
export const payMent = (data) => http.post('/api/pay/pay', data.formData);
export const changeMark = (data) => http.post('/api/users/changeMark', data);
export const getPreviewChat = () => http.post('/api/chatSQL/getPreview');
export const getDialog = (data) => http.post('/api/chatSQL/getChat', data);
export const dataForContest = (data) => http.post('/api/contests/dataForContest', data);
export const cashOut = (data) => http.post('/api/pay/cashout', data);
export const updateUser = (data) => http.post('/api/users/updateUser', data);
export const newMessage = (data) => http.post('/api/chatSQL/newMessage', data);
export const changeChatFavorite = (data) => http.post('/api/chatSQL/favorite', data);
export const changeChatBlock = (data) => http.post('/api/chatSQL/blackList', data);
export const getCatalogList = (data) => http.post('/api/chatSQL/getCatalogs', data);
export const addChatToCatalog = (data) => http.post('/api/chatSQL/addNewChatToCatalog', data);
export const createCatalog = (data) => http.post('/api/chatSQL/createCatalog', data);
export const deleteCatalog = (data) => http.post('/api/chatSQL/deleteCatalog', data);
export const removeChatFromCatalog = (data) => http.post('/api/chatSQL/removeChatFromCatalog', data);
export const changeCatalogName = (data) => http.post('/api/chatSQL/updateNameCatalog', data);
export const getCustomersContests = (data) => http.post('/api/contests/getCustomersContests', { limit: data.limit, offset: data.offset }, {
  headers: {
    status: data.contestStatus,
  },
});

export const getActiveContests = ({
  offset, limit, typeIndex, contestId, industry, awardSort, ownEntries,
}) => http.post('/api/contests/getAllContests', {
  offset, limit, typeIndex, contestId, industry, awardSort, ownEntries,
});

export const getContestById = (data) => http.get('/api/contests/getContestById', {
  headers: {
    contestId: data.contestId,
  },
});

export const getModeratorContests = (data) => http.post('/api/moderation/get-contests', data);
export const getModeratorOffers = (data) => http.post('/api/moderation/get-offers', data);
export const getContestByIdForModerator = (data) => http.get('/api/moderation/getContestByIdForModerator', {
  headers: {
    contestId: data.contestId,
  },
});
export const moderationContest = (data) => http.post('/api/moderation/moderation-contestId', data);
export const moderationOffer = (data) => http.post('/api/moderation/moderation-offerId', data);

import http from '../interceptor';
import CONSTANTS from "../../constants";

const {
  URL_REGISTRATION,
  URL_LOGIN,
  URL_DATA_FOR_CONTEST,
  URL_REFRESH_TOKEN,
} = CONSTANTS;

export const registerRequest = (data) => http.post(URL_REGISTRATION, data);
export const loginRequest = (data) => http.post(URL_LOGIN, data);
export const refreshTokenRequest = () => http.post(URL_REFRESH_TOKEN);
export const getUser = () => http.post('/api/users/getUser');
export const updateContest = (data) => http.post('/api/contests/updateContest', data);
export const setNewOffer = (data) => http.post('/api/users/setNewOffer', data);
export const setOfferStatus = (data) => http.post('/api/users/setOfferStatus', data);
export const downloadContestFile = (data) => http.get(`/api/users/downloadFile/${data.fileName}`);
export const payMent = (data) => http.post('/api/payment/pay', data.formData);
export const changeMark = (data) => http.post('/api/users/changeMark', data);
export const getPreviewChat = () => http.post('/api/chatSQL/getPreview');
export const getDialog = (data) => http.post('/api/chatSQL/getChat', data);
export const dataForContest = (data) => http.post(URL_DATA_FOR_CONTEST, data);
export const cashOut = (data) => http.post('/api/payment/cashOut', data);
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

//true requests
export const getModeratorContests = (query) => http.get(`/api/moderation/get-contests${query}`);
export const getModeratorOffers = (query) => http.get(`/api/moderation/get-offers${query}`);
export const getContestByIdForModerator = (data) => http.get(`/api/moderation/getContestByIdForModerator/${data.contestId}`);
export const moderationContest = (data) => http.patch(`/api/moderation/moderation-contestId/${data.contestId}`, data.newStatus);
export const moderationOffer = (data) => http.patch(`/api/moderation/moderation-offerId/${data.offerId}`, data.body);

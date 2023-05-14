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
export const payMent = (data) => http.post('/api/payment/pay', data.formData);
export const changeMark = (data) => http.post('/api/users/changeMark', data);
export const getPreviewChat = () => http.post('/api/chatSQL/getPreview');
export const getDialog = (data) => http.post('/api/chatSQL/getChat', data);
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


//true requests
//CONTEST REQUESTS
export const getContestById = ({contestId}) => http.get(`/api/contests/getContestById/${contestId}`);
export const dataForContest = (query) => http.get(URL_DATA_FOR_CONTEST + query);
export const updateContest = (data) => http.patch('/api/contests/updateContest', data);
export const getActiveContests = (query) => http.get(`/api/contests/getAllContests${query}`);
export const getCustomersContests = (query) => http.get(`/api/contests/getCustomersContests${query}`);
export const downloadContestFile = ({fileName}) => http.get(`/api/contests/downloadFile/${fileName}`);
export const setOfferStatus = ({offerId, body}) => http.patch(`/api/contests/setOfferStatus/${offerId}`, body);
export const setNewOffer = (data) => http.post('/api/contests/setNewOffer', data);

//MODERATOR REQUESTS
export const getModeratorContests = (query) => http.get(`/api/moderation/get-contests${query}`);
export const getModeratorOffers = (query) => http.get(`/api/moderation/get-offers${query}`);
export const getContestByIdForModerator = ({contestId}) => http.get(`/api/moderation/getContestByIdForModerator/${contestId}`);
export const moderationContest = ({contestId, newStatus}) => http.patch(`/api/moderation/moderation-contestId/${contestId}`, newStatus);
export const moderationOffer = ({offerId, body}) => http.patch(`/api/moderation/moderation-offerId/${offerId}`, body);

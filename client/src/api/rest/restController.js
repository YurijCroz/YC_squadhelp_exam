import http from '../interceptor';
import CONSTANTS from "../../constants";

const {
  URL_REGISTRATION,
  URL_LOGIN,
  URL_DATA_FOR_CONTEST,
  URL_REFRESH_TOKEN,
} = CONSTANTS;

//AUTH REQUESTS
export const registerRequest = (data) => http.post(URL_REGISTRATION, data);
export const loginRequest = (data) => http.post(URL_LOGIN, data);
export const refreshTokenRequest = () => http.post(URL_REFRESH_TOKEN);

//PAYMENT REQUESTS
export const payMent = ({formData}) => http.post('/api/payment/pay', formData);
export const cashOut = (data) => http.post('/api/payment/cashOut', data);

//USER REQUESTS
export const getUser = () => http.get('/api/users/getUser');
export const changeMark = ({creatorId, ...other}) => http.patch(`/api/users/changeMark/${creatorId}`, {...other});
export const updateUser = (data) => http.patch('/api/users/updateUser', data);

//CHAT REQUESTS
export const newMessage = (data) => http.post('/api/chatSQL/newMessage', data);
export const addChatToCatalog = (data) => http.post('/api/chatSQL/addNewChatToCatalog', data);
export const createCatalog = (data) => http.post('/api/chatSQL/createCatalog', data);
export const getPreviewChat = () => http.get('/api/chatSQL/getPreview');
export const getDialog = ({interlocutorId}) => http.get(`/api/chatSQL/getChat/${interlocutorId}`);
export const getCatalogList = () => http.get('/api/chatSQL/getCatalogs');
export const deleteCatalog = ({catalogId}) => http.delete(`/api/chatSQL/deleteCatalog/${catalogId}`);
export const removeChatFromCatalog = (query) => http.delete(`/api/chatSQL/removeChatFromCatalog${query}`);
export const changeCatalogName = ({catalogId, ...other}) => http.patch(`/api/chatSQL/updateNameCatalog/${catalogId}`, {...other});
export const changeChatFavorite = (data) => http.patch('/api/chatSQL/favorite', data);
export const changeChatBlock = (data) => http.patch('/api/chatSQL/blackList', data);

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

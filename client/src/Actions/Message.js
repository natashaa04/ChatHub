import axios from 'axios';
import store from '../store'; // assuming you have a store file
import {
  sendMessageRequest,
  sendMessageSuccess,
  sendMessageFailure,
  removeSendMessageError,
  removeSendMessageMessage,
} from '../Reducers/Message';
import {
  getConversationsRequest,
  getConversationsSuccess,
  getConversationsFailure,
  removeGetConversationsError,
  removeGetConversationsMessage,
} from '../Reducers/Message';
import {
  getSuggestionsRequest,
  getSuggestionsSuccess,
  getSuggestionsFailure,
  removeGetSuggestionsError,
  removeGetSuggestionsMessage,
} from '../Reducers/Message';
import {
  getMessagesRequest,
  getMessagesSuccess,
  getMessagesFailure,
  removeGetMessagesError,
  removeGetMessagesMessage,
} from '../Reducers/Message';

const URL = 'http://localhost:8000'; 



export const addMessage = async (messageData) => {
  try {
    store.dispatch(sendMessageRequest());

    const { data } = await axios.post(`${URL}/api/v1/addMessage`, messageData, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
    });

    store.dispatch(sendMessageSuccess(data.message));
  } catch (error) {
    store.dispatch(sendMessageFailure(error.response.data.message));
  }
};



// export const getSuggestions = async () => {
//   try {
//     store.dispatch(getSuggestionsRequest());

//     const { data } = await axios.get(`${URL}/api/v1/suggestions`, {
//       headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
//     });

//     store.dispatch(getSuggestionsSuccess(data.suggestions));
//   } catch (error) {
//     store.dispatch(getSuggestionsFailure(error.response.data.message));
//   }
// };



export const getConversation = async (firstUserId,secondUserId) => {
  try {
    store.dispatch(getConversationsRequest());
     console.log('conversation request started')
    const {data}  = await axios.get(`${URL}/api/v1/getConversation/${firstUserId}/${secondUserId}`, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
    });
    console.log('conversation data',data);

    store.dispatch(getConversationsSuccess(data.conversationId));
  } catch (error) {
    store.dispatch(getConversationsFailure(error.response.data.message));
  }
};



export const getMessages = async (conversationId,page) => {
  try {
    store.dispatch(getMessagesRequest());

    const { data } = await axios.get(`${URL}/api/v1/getMessages/${conversationId}/${page}`, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
    });
   console.log('message data is',data);
    store.dispatch(getMessagesSuccess(data));
  } catch (error) {
    store.dispatch(getMessagesFailure(error.response.data.message));
  }
};

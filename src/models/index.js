// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Video, ChatRoom, Message, User, UserChatRoom } = initSchema(schema);

export {
  Video,
  ChatRoom,
  Message,
  User,
  UserChatRoom
};
// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Post, ChatRoom, Message, User, UserChatRoom } = initSchema(schema);

export {
  Post,
  ChatRoom,
  Message,
  User,
  UserChatRoom
};
/*
  DB.ts

  This file defines the local database schema for our app. Any time we show any
  data in the UI, it should come from the database.
*/

import Dexie from "dexie";

export interface Conversation {
  id?: number;
  topic: string;
  title: string | undefined;
  createdAt: Date;
  updatedAt: Date;
  isGroup: boolean;
  peerAddress: string;
  groupMembers?: string[] | undefined;
}

export interface Message {
  id?: number;
  inReplyToID: string;
  conversationTopic: string;
  xmtpID: string;
  senderAddress: string;
  sentByMe: boolean;
  sentAt: Date;
  contentType: {
    authorityId: string;
    typeId: string;
    versionMajor: number;
    versionMinor: number;
  };
  content: any;
  metadata?: { [key: string]: [value: string] };
  isSending: boolean;
}

export interface MessageAttachment {
  id?: number;
  messageID: number;
  filename: string;
  mimeType: string;
  data: Uint8Array;
}

class DB extends Dexie {
  conversations!: Dexie.Table<Conversation, number>;
  messages!: Dexie.Table<Message, number>;
  attachments!: Dexie.Table<MessageAttachment, number>;

  constructor() {
    super("DB");
    this.version(2).stores({
      conversations: `
        ++id,
        topic,
        title,
        createdAt,
        updatedAt,
        isGroup,
        groupMembers,
        peerAddress
        `,
      messages: `
        ++id,
        inReplyToID,
        conversationTopic,
        xmtpID,
        senderAddress,
        sentByMe,
        sentAt,
        contentType,
        content
        `,
      attachments: `
        ++id,
        messageID,
        filename,
        mimeType,
        data
      `,
    });
  }
}

const db = new DB();
export default db;

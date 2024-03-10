const DATE_FORMAT = `ALTER SESSION SET NLS_DATE_FORMAT="YYYY/MM/DD HH24:MI:SS"`;

export const MEMBER = `
  CREATE TABLE MEMBER (
    ID NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    EMAIL VARCHAR2(255) NOT NULL,
    PROVIDER VARCHAR2(20) NOT NULL,
    DISABLED CHAR(1) DEFAULT 'N' NOT NULL,
    LV INT DEFAULT 1 NOT NULL,
    CREATE_AT DATE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    LOGIN_AT DATE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    DISCONNECT CHAR(1) DEFAULT 'N' NOT NULL
  )
`;

export const SETLIST = `
  CREATE TABLE SETLIST (
    VIDEO_ID VARCHAR2(50) PRIMARY KEY NOT NULL,
    DESCRIPTION VARCHAR2(6000) NOT NULL,
    MEMBER_ID NUMBER NOT NULL,
    CREATE_AT DATE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    UPDATE_AT DATE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CHANNEL_ID VARCHAR2(50) NOT NULL,
    BROADCAST_AT DATE NOT NULL,
    TITLE VARCHAR2(255) NOT NULL,
    FOREIGN KEY (MEMBER_ID) REFERENCES MEMBER(ID)
  )
`;

export const BLACKLIST = `
  CREATE TABLE BLACKLIST (
    MEMBER_ID NUMBER PRIMARY KEY NOT NULL,
    CHANNEL_ID VARCHAR2(50) NOT NULL
  )
`;

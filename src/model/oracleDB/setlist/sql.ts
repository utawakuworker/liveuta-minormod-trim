export const GET_SETLIST = `
  SELECT SETLIST.*, MEMBER.EMAIL
  FROM SETLIST
  JOIN MEMBER ON MEMBER_ID = MEMBER.ID
  WHERE VIDEO_ID = :videoId
`;

export const GET_MAX_COUNT = `
  SELECT COUNT(*)
  FROM SETLIST
`;

export const GET_ALL_SETLIST = `
  SELECT *
  FROM (
      SELECT r.*, MEMBER.EMAIL, ROWNUM AS rnum
      FROM (
          SELECT *
          FROM (
              SELECT *
              FROM SETLIST
              ORDER BY CREATE_AT DESC
          )
          WHERE ROWNUM <= :endRow
      ) r
      JOIN MEMBER ON r.MEMBER_ID = MEMBER.ID
  )
  WHERE rnum >= :startRow
`;

export const SEARCH_MAX_COUNT = `
  SELECT COUNT(*)
  FROM SETLIST
  WHERE LOWER(DESCRIPTION) LIKE LOWER(:pattern)
`;

export const SEARCH_SETLIST = `
  SELECT *
  FROM (
      SELECT r.*, MEMBER.EMAIL, ROWNUM AS rnum
      FROM (
          SELECT *
          FROM (
              SELECT *
              FROM SETLIST
              WHERE LOWER(DESCRIPTION) LIKE LOWER(:pattern)
              ORDER BY CREATE_AT DESC
          )
          WHERE ROWNUM <= :endRow
      ) r
      JOIN MEMBER ON r.MEMBER_ID = MEMBER.ID
  )
  WHERE rnum >= :startRow
`;

export const POST_SETLIST = `
  INSERT INTO SETLIST (VIDEO_ID, DESCRIPTION, MEMBER_ID, CHANNEL_ID, BROADCAST_AT, TITLE)
  VALUES (:videoId, :description, :memberId, :channelId, :broadcastAt, :title)
`;

export const UPDATE_SETLIST = `
  UPDATE SETLIST
  SET 
    title = :title,
    DESCRIPTION = :description, 
    CHANNEL_ID = :channelId, 
    MEMBER_ID = :memberId, 
    UPDATE_AT = CURRENT_TIMESTAMP, 
    BROADCAST_AT = :broadcastAt 
  WHERE VIDEO_ID = :videoId
`;

export const DELETE_SETLIST = `
  DELETE FROM SETLIST
  WHERE VIDEO_ID = :videoId
`;

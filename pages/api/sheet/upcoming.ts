import type { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";
import {
  SheetResponseData,
  rowData,
  UpcomingData,
} from "@/models/sheet/in_sheet";
import getNowDate from "@/utils/get_now_date";
import getinterval from "@/utils/get_interval";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const service = google.sheets({ version: "v4" });
    const result = await service.spreadsheets.values.get({
      spreadsheetId: process.env.spreadsheetId || "",
      key: process.env.sheet_apiKey || "",
      range: process.env.upcoming_sheet_range || "",
    });
    const data = result.data as SheetResponseData;
    const upcoming: UpcomingData[] = [];
    const now = getNowDate() + +(process.env.local_time ?? 0);
    /** default 2시간 지연 */
    const delayTime = now - +(process.env.interval_time ?? 7200000);

    data.values.forEach(
      ([
        title,
        url,
        channelName,
        scheduledTime,
        thumbnailUrl,
        bool,
      ]: rowData) => {
        if (bool === "FALSE") {
          const stringTime = scheduledTime.replace(" ", "T").split(" JST")[0];
          if (stringTime.length === 19) {
            const time = new Date(stringTime);
            const timestamp = time.getTime();
            if (delayTime < timestamp) {
              const korTime = time.toLocaleString("ko-kr", {
                // year: "numeric",
                month: "short",
                day: "numeric",
                weekday: "short",
                hour: "numeric",
                minute: "numeric",
              });
              const iterval = getinterval(now, timestamp);
              const vaildURL = thumbnailUrl.match(
                "https://i.ytimg.com/vi/"
              )?.length;
              if (vaildURL === 1) {
                const highThumbnailUrl = thumbnailUrl.replace(
                  /(default|maxresdefault)/i,
                  "hqdefault"
                );
                let replacedTitle = title.replace(
                  /\【(.*?)\】|\〖(.*?)\〗/gi,
                  ""
                );
                // if (replacedTitle.length > 40) {
                //   replacedTitle = replacedTitle.substring(0, 40) + "...";
                // }
                const videoId = url.replace(
                  "https://www.youtube.com/watch?v=",
                  ""
                );
                const upcomingData: UpcomingData = {
                  title: replacedTitle,
                  url,
                  channelName,
                  videoId,
                  timestamp,
                  thumbnailUrl: highThumbnailUrl,
                  korTime,
                  iterval,
                };
                upcoming.push(upcomingData);
              }
            }
          }
        }
      }
    );
    return res.status(200).json({ total: upcoming.length, upcoming });
  } catch (err) {
    console.error(err);
    return res.status(200).json({ total: 0, upcoming: [] });
  }
}

// https://developers.google.com/sheets/api/guides/concepts?hl=ko#cell

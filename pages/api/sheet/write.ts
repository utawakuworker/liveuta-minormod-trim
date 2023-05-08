import type { NextApiRequest, NextApiResponse } from 'next';
import { SheetAPIReturntype } from '@/models/sheet/inSheet';
import { getSheet } from '@/models/sheet';
import { parseAllData, parseScheduledData } from '@/utils/parseContentSheet';
import getENV from '@/utils/getENV';
import { CONTENTS_SHEET_ID, CONTENTS_SHEET_RANGE } from '@/consts';
import { google } from 'googleapis';

const handler = async (req: NextApiRequest, res: NextApiResponse<SheetAPIReturntype | undefined>) => {
  try {
    if (!req.method) throw new Error('invaild method');
    const spreadsheetId = getENV(CONTENTS_SHEET_ID);
    const range = getENV(CONTENTS_SHEET_RANGE);

    //write 코드
    //1 youtube data api videoId 로 계정 정보를 가져온다.
    //2 채널 시트에서 이미 신청되었는지 검증
    //3 입력 폼에서 한글 채널 명을 받는다.
    //4 입력받은 채널명과 uid 채널 주소를 스프레드시트에 적는다. 제일 하단 123
    const result = await google.sheets({ version: 'v4' }).spreadsheets.values.update({
      spreadsheetId: '1-nWhMrQ_h_y8G3ZMtI2afFiRiaLqtyoZIIUPwPHdF3k',
      range: '시트1!A1:A3',
      requestBody: {
        values: [['입력'], ['입력2'], [1]],
      },
      valueInputOption: 'RAW',
      access_token: '',
    });
    console.log(result.data);
  } catch (err) {
    console.error(err);
    return res.status(400).end();
  }
};

export default handler;
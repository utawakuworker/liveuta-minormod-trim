## node v18.13.0

## Server API docs

1. GET /api/search?query={채널명}

```
  return {
   contents: ContentsDataType[];
   channels: ContentsDataType[];
  }
```

2. GET /api/sheet

```
  return {
    scheduled: ContentsDataTypes;
    live: ContentsDataTypes;
    daily: ContentsDataTypes;
    all: ContentsDataTypes;
  }
```

## Types

```
ContentsDataType: {
  title: string;
  url: string;
  channelName: string;
  videoId: string;
  timestamp: number;
  thumbnailURL?: string;
  isStream: isStream;
  korTime: string;
  interval: string;
}

ContentsDataTypes: {
  total: number;
  contents: ContentsDataType[];
}
```

## Packages

```
"react": "^18.2.0",
"next": "13.4.12",
"axios": "^1.3.4",
"swr": "^2.1.3",
"react-toastify": "^9.1.2",
"next-sitemap": "^4.0.9",
"react-icons": "^4.8.0",
"sass": "^1.59.2",
"typescript": "4.9.5",
"dayjs": "^1.11.8",
"universal-cookie": "^4.0.4"
```

## Environments

```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
HOLODEX_API_KEY=
GOOGLE_API_KEY=AIz...

CONTENTS_SHEET_ID=sheetId
CHANNELS_SHEET_ID=sheetId
CONTENTS_SHEET_RANGE=Upcoming
CHANNELS_SHEET_RANGE=reference

SHORT_URL=http://SHORT_URL.com
REQUEST_URL=http://REQUEST_URL.com

```

```
사용중아님
REDIRECT_URL=

GOOGLE_CLIENT_ID=
GOOGLE_SECRET_KEY=

ACCESS_SECRET=
REFRESH_SECRET=
```

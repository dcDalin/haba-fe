/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from 'react';

const HabaContext = createContext({
  loading: true,
  feed: null,
  error: null,
  loadFeed: (_id: any) => _id,
  stkPush: (data: any) => data,
  toastMsg: null,
});

export default HabaContext;

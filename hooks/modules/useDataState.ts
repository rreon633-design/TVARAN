
import { useState } from 'react';
import { Bookmark, HistoryItem, DownloadItem, NotebookEntry, PasswordCredential, AutofillProfile, PaymentMethod, SiteStorageEntry } from '../../types';

export const useDataState = () => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [downloads, setDownloads] = useState<DownloadItem[]>([]);
  const [notebookEntries, setNotebookEntries] = useState<NotebookEntry[]>([]);
  const [passwords, setPasswords] = useState<PasswordCredential[]>([]);
  const [autofillProfiles, setAutofillProfiles] = useState<AutofillProfile[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [siteStorage, setSiteStorage] = useState<SiteStorageEntry[]>([]);

  return {
    bookmarks, setBookmarks,
    history, setHistory,
    downloads, setDownloads,
    notebookEntries, setNotebookEntries,
    passwords, setPasswords,
    autofillProfiles, setAutofillProfiles,
    paymentMethods, setPaymentMethods,
    siteStorage, setSiteStorage
  };
};

import {
  ExtendedSearchResultItem,
  IFilmData,
  ITopFilm,
  KeyWordSearchInterface,
  SearchQuerryOptions,
} from './response-data';

export interface StateInterface {
  premiere: IFilmData | null;
  films: ITopFilm[];
  best: ITopFilm[];
  player: Record<string, string>;
  iframe: HTMLElement;
  moviePage: {
    pageID: string;
    currentData: IFilmData | null;
  };
  previousPageInfo: PreviousPageInfoInterface;
  search: {
    searchResult: KeyWordSearchInterface | null;
    searchTopResult: ITopFilm[];
    searchExtendedResult: ExtendedSearchResultItem[];
    searchKeywordValue: string;
    searchFilmsCountResult: number;
    searchMaxPages: number;
    searchNextPage: number;
    searchStatus: 'search' | 'top' | 'yearSearch';
    searchTopStatus: 'TOP_250_BEST_FILMS' | 'TOP_100_POPULAR_FILMS' | 'TOP_AWAIT_FILMS';
    filterOptions: SearchQuerryOptions;
  };
  login: {
    logged: boolean;
    name: string;
    token: string;
  };
}

export interface PreviousPageInfoInterface {
  currentPageHash?: string;
  currentPageID?: string;
  previousPageHash?: string;
  previousPageID?: string;
}

import { IFilmData, IReviewsData, IStaff, ITopFilm } from './response-data';

export interface StateInterface {
  premiere: IFilmData | null;
  movieData: IFilmData | null;
  movieStaff: IStaff[];
  movieReviews: IReviewsData | null;
  films: ITopFilm[];
  best: ITopFilm[];
  player: Record<string, string>;
  iframe: HTMLElement;
  moviePage: {
    pageID: string;
    currentData: IFilmData | null;
  };
  previousPageInfo: PreviousPageInfoInterface;
}

export interface PreviousPageInfoInterface {
  currentPageHash?: string;
  currentPageID?: string;
  previousPageHash?: string;
  previousPageID?: string;
}

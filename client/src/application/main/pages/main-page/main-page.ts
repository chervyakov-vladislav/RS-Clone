import DOMElement from '../../../shared/components/base-elements/dom-element';
import Page from '../../../shared/components/page';
import BestSection from '../../components/main-page/best-films/best-films';
import PremierePreview from '../../components/main-page/premiere-preview/premiere-preview';
import RecomendSection from '../../components/main-page/recomend/recomend';
import InterestedSection from '../../components/main-page/interested/interested-films';
import storage from '../../../shared/components/local-storage';

export default class MainPage extends Page {
  private premiereContainer: DOMElement;

  private premiere: PremierePreview | null;

  private recomend: RecomendSection | null;

  private best: BestSection | null;

  private interested: InterestedSection | null;

  constructor(id: string) {
    super(id);

    this.premiereContainer = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['main-page__premiere'],
    });

    this.premiere = null;
    this.recomend = null;
    this.best = null;
    this.interested = null;

    this.render();
  }

  public render() {
    this.premiere = new PremierePreview(this.premiereContainer.node);
    this.recomend = new RecomendSection(this.premiereContainer.node);
    this.best = new BestSection(this.premiereContainer.node);
    if (!(storage.getMovies().length === 0)) {
      this.interested = new InterestedSection(this.premiereContainer.node);
    }
  }
}

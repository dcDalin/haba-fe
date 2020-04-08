import { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { History } from 'history';

interface Props {
  history: History;
}

const ScrollToTop: React.FC<Props> = (props: Props) => {
  const { history } = props;
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });
    return (): any => {
      unlisten();
    };
  }, []);

  return null;
};

export default withRouter(ScrollToTop);

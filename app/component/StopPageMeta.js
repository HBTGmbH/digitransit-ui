import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { intlShape } from 'react-intl';
import { createFragmentContainer, graphql } from 'react-relay';
import compose from 'recompose/compose';
import getContext from 'recompose/getContext';
import mapProps from 'recompose/mapProps';

import { generateMetaData } from '../util/metaUtils';

const StopPageMeta = compose(
  getContext({ config: PropTypes.object, intl: intlShape }),
  mapProps(({ config, intl, params, stop }) => {
    if (!stop) {
      return false;
    }

    const title = intl.formatMessage(
      {
        id: params.stopId ? 'stop-page.title' : 'terminal-page.title',
        defaultMessage: params.stopId
          ? 'Stop - {name} {code}'
          : 'Terminal - {name}',
      },
      stop,
    );
    const description = intl.formatMessage(
      {
        id: params.stopId
          ? 'stop-page.description'
          : 'terminal-page.description',
        defaultMessage: params.stopId
          ? 'Stop - {name} {code}, {desc}'
          : 'Terminal - {name} {code}, {desc}',
      },
      stop,
    );
    return generateMetaData(
      {
        description,
        title,
      },
      config,
    );
  }),
)(Helmet);

export default createFragmentContainer(StopPageMeta, {
  stop: graphql`
    fragment StopPageMeta_stop on Stop {
      name
      code
      desc
    }
  `,
});

import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage, intlShape } from 'react-intl';

import ComponentUsageExample from './ComponentUsageExample';
import ExternalLink from './ExternalLink';
import { renderZoneTicketIcon, isWithinZoneB } from './ZoneTicketIcon';

export default function TicketInformation({ fares, zones }, { config, intl }) {
  if (fares.length === 0) {
    return null;
  }

  const isMultiComponent = fares.length > 1;
  const isOnlyZoneB = isWithinZoneB(
    zones,
    fares.filter(fare => !fare.isUnknown),
  );

  return (
    <div className="row itinerary-ticket-information">
      <div className="itinerary-ticket-type">
        <div className="ticket-type-title">
          <FormattedMessage
            id={
              isMultiComponent
                ? 'itinerary-tickets.title'
                : 'itinerary-ticket.title'
            }
            defaultMessage="Required tickets"
          />:
        </div>
        {fares.map((fare, i) => (
          <div
            className={cx('ticket-type-zone', {
              'multi-component': isMultiComponent,
            })}
            key={i} // eslint-disable-line react/no-array-index-key
          >
            {fare.isUnknown ? (
              <div>
                <div className="ticket-identifier">{fare.routeName}</div>
                {fare.agency && (
                  <div className="ticket-description">{fare.agency.name}</div>
                )}
              </div>
            ) : (
              <div>
                <div className="ticket-identifier">
                  {config.useTicketIcons
                    ? renderZoneTicketIcon(fare.ticketName, isOnlyZoneB)
                    : fare.ticketName}
                </div>
                <div className="ticket-description">
                  {`${intl.formatMessage({ id: 'ticket-single-adult' })}, ${(
                    fare.cents / 100
                  ).toFixed(2)} €`}
                </div>
              </div>
            )}
            {fare.agency &&
              fare.agency.fareUrl && (
                <div className="ticket-type-agency-link">
                  <ExternalLink
                    className="itinerary-ticket-external-link"
                    href={fare.agency.fareUrl}
                  >
                    {intl.formatMessage({ id: 'extra-info' })}
                  </ExternalLink>
                </div>
              )}
          </div>
        ))}
      </div>
      {config.ticketLink && (
        <ExternalLink
          className="itinerary-ticket-external-link"
          href={config.ticketLink}
        >
          {intl.formatMessage({ id: 'buy-ticket' })}
        </ExternalLink>
      )}
    </div>
  );
}

TicketInformation.propTypes = {
  fares: PropTypes.arrayOf(
    PropTypes.shape({
      agency: PropTypes.shape({
        fareUrl: PropTypes.string,
        name: PropTypes.string,
      }),
      fareId: PropTypes.string,
      cents: PropTypes.number,
      isUnknown: PropTypes.bool,
      routeName: PropTypes.string,
      ticketName: PropTypes.string,
    }),
  ),
  zones: PropTypes.arrayOf(PropTypes.string),
};

TicketInformation.defaultProps = {
  fares: [],
  zones: [],
};

TicketInformation.contextTypes = {
  config: PropTypes.object,
  intl: intlShape.isRequired,
};

TicketInformation.displayName = 'TicketInformation';

TicketInformation.description = () => (
  <div>
    <p>Information about the required ticket for the itinerary.</p>
    <ComponentUsageExample description="single fare">
      <TicketInformation
        fares={[{ fareId: 'HSL:AB', cents: 280, ticketName: 'AB' }]}
      />
    </ComponentUsageExample>
    <ComponentUsageExample description="single fare, with agency fare url">
      <TicketInformation
        fares={[
          {
            agency: { fareUrl: 'foo' },
            cents: 280,
            fareId: 'HSL:AB',
            ticketName: 'AB',
          },
        ]}
      />
    </ComponentUsageExample>
    <ComponentUsageExample description="single fare, multiple options">
      <TicketInformation
        fares={[{ fareId: 'HSL:AB', cents: 280, ticketName: 'AB' }]}
        zones={['B']}
      />
    </ComponentUsageExample>
    <ComponentUsageExample description="multiple fares">
      <TicketInformation
        fares={[
          { fareId: 'HSL:AB', cents: 280, ticketName: 'AB' },
          { fareId: 'HSL:BC', cents: 280, ticketName: 'BC' },
        ]}
      />
    </ComponentUsageExample>
    <ComponentUsageExample description="unknown fare">
      <TicketInformation
        fares={[
          { fareId: 'HSL:ABC', cents: 460, ticketName: 'ABC' },
          {
            agency: { fareUrl: 'foo', name: 'Ferry operator' },
            isUnknown: true,
            routeName: 'Ferry line',
          },
        ]}
      />
    </ComponentUsageExample>
  </div>
);

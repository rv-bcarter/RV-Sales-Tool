import React, { Component, Fragment } from 'react';
import { NavLink, Route, Switch } from "react-router-dom";

import { Alert } from 'shared/alert/'
import PageBlankState from 'shared/layout/PageBlankState';
import {
  Popout,
  PopoutBody,
  PopoutContainer,
  PopoutList,
  PopoutItem,
  PopoutTrigger } from '../../shared/popout/';
import SATMailCreate from 'messages/mail/SATMailCreate';
import SATMessagesAside from 'messages/shared/SATMessagesAside';
import SATMessagesAsideHeader from 'messages/shared/SATMessagesAsideHeader';
import SATMessagesAsideHeaderActionButton from 'messages/shared/SATMessagesAsideHeaderActionButton';
import SATMessagesAsideHeaderActionList from 'messages/shared/SATMessagesAsideHeaderActionList';
import SATMessagesAsideHeaderActionItem from 'messages/shared/SATMessagesAsideHeaderActionItem';
import SATMessagesContent from 'messages/shared/SATMessagesContent';
import SATMessagesList from 'messages/shared/SATMessagesList';
import SATMessagesMessage from 'messages/shared/SATMessagesMessage';

import cardStyles from 'css/components/card.module.css';
import messageStyles from 'css/pages/messages.module.css';

// TODO:
  // • Alerts should probable have a default timeout in the component
  // • Alert is currently being positioned with negative margin should
    // probably fix so it can be used in other areas
  // • Redirect URL on delete to mail route

class SATMailIndex extends Component {

  state = {
    messages: mockMessageItems,
    deleteAlert: false,
    messageSearchInput: false,
  }

  componentDidUpdate(prevProps, prevState) {

    if (this.state.deleteAlert !== prevState.deleteAlert) {
      this.removeDeleteAlert = setTimeout(() => {
        this.setState({
          deleteAlert: false
        });
      }, 6000);
    }
  };

  removeMessage(e, id) {
    e.stopPropagation();
    e.preventDefault();

    const newState = this.state;
    const index = newState.messages.findIndex(m => m.id === id);

    if (index === -1) return;
    newState.messages.splice(index, 1);

    this.setState({
      newState,
      deleteAlert: true
    });
  };

  archiveMessage(e, item) {
    e.stopPropagation();
    e.preventDefault();

    // TODO:
      // • Update opbject on data model for message to hide archived message from:
      // • Unread List
      // • All Message List

    console.log(item);
  }

  toggleMessageSearchInput() {

    this.setState({
      messageSearchInput: !this.state.messageSearchInput,
    });
  }

  render() {

    const { messages } = this.state;

    return (
      <Fragment>
        { this.state.deleteAlert &&
          <Alert
            alertText="You have successfully deleted a message."
            alertIcon="info"
            alertType={1}
          />
        }
        <div className={`${cardStyles.card} ${cardStyles.full} ${messageStyles.container}`}>
          <SATMessagesAside>
            <SATMessagesAsideHeader>
              <SATMessagesAsideHeaderActionList>
                <li className={`${messageStyles.action__item} ${messageStyles.mail__main}`}>
                  <NavLink
                    to="/messages/mail/create">
                    <button className={`${messageStyles.button}`}>New Message</button>
                  </NavLink>
                </li>
                <SATMessagesAsideHeaderActionItem>
                  <SATMessagesAsideHeaderActionButton
                    actionItemIcon="search"
                    actionItemIconColor="#20CD8E"
                    handleClick={this.toggleMessageSearchInput.bind(this)}
                  />
                </SATMessagesAsideHeaderActionItem>
                <SATMessagesAsideHeaderActionItem>
                  <PopoutContainer>
                    <PopoutTrigger
                      popoutId="mail-filter">
                      <SATMessagesAsideHeaderActionButton
                        actionItemIcon="filter_list"
                        actionItemIconColor="#20CD8E"
                      />
                    </PopoutTrigger>
                    <Popout>
                      <PopoutBody>
                        <PopoutList>
                          <PopoutItem
                            itemText="All Messages"
                          />
                          <PopoutItem
                            itemText="Unread Messages"
                          />
                          <PopoutItem
                            itemText="Archived Messages"
                          />
                        </PopoutList>
                      </PopoutBody>
                    </Popout>
                  </PopoutContainer>
                </SATMessagesAsideHeaderActionItem>
              </SATMessagesAsideHeaderActionList>
              <div
                className={`
                  ${messageStyles.header__search}
                  ${this.state.messageSearchInput ? 'open' : 'closed'}
                `}
              >
                <input
                  type="search"
                  placeholder="Find a message …"
                />
              </div>
            </SATMessagesAsideHeader>
            <SATMessagesList
              messageRoute="mail"
              removeMessage={this.removeMessage.bind(this)}
              archiveMessage={this.archiveMessage.bind(this)}
              items={messages}
            />
          </SATMessagesAside>
          <SATMessagesContent>
            <Switch>
              <Route
                exact
                path="/messages/mail/"
                render={ () =>
                  <PageBlankState
                    blankStateIcon="mail"
                    blankStateText="Your messages"
                  />
                }
              />
              <Route
                path="/messages/mail/create"
                component={SATMailCreate}
              />
              <Route
                path="/messages/mail/:id"
                render={ (props) =>
                  <SATMessagesMessage
                    messagesReadOnly={false}
                    data={mockMessageItems}
                    removeMessage={this.removeMessage.bind(this)}
                    archiveMessage={this.archiveMessage.bind(this)}
                    {...props}
                  />
                }
              />
            </Switch>
          </SATMessagesContent>
        </div>
      </Fragment>
    );
  }
}

export default SATMailIndex;

const mockMessageItems = [
  {
    id: '1',
    updated_at: '22 mins ago',
    message_title: 'Caitlyn Zahn',
    broadcast: false,
    unread: true,
    archived: false,
    messages: [
      {
        created_at: '22 mins ago',
        currrent_user: false,
        author: 'Caitlyn Zahn',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean efficitur mi massa, at faucibus orci sagittis sit amet. Vestibulum blandit lacus eu lorem ullamcorper, at sagittis urna molestie.'
      },
    ],
  },
  {
    id: '2',
    updated_at: '1 day ago',
    message_title: 'Clay Carpenter',
    broadcast: false,
    unread: false,
    archived: false,
    messages: [
      {
        created_at: '3 day ago',
        currrent_user: true,
        author: 'Kurt Cunningham',
        body: 'Lorem ipsum dolor sit amet?'
      },
      {
        created_at: '2 days ago',
        currrent_user: false,
        author: 'Clay Carpenter',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean efficitur mi massa, at faucibus orci sagittis sit amet.'
      },
      {
        created_at: '1 day ago',
        currrent_user: true,
        author: 'Kurt Cunningham',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean efficitur mi massa, at faucibus orci sagittis sit amet. Vestibulum blandit lacus eu lorem ullamcorper, at sagittis urna molestie.'
      },
      {
        created_at: '1 day ago',
        currrent_user: false,
        author: 'Clay Carpenter',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean efficitur mi massa, at faucibus orci sagittis sit amet.'
      },
      {
        created_at: '2 minutes ago',
        currrent_user: true,
        author: 'Kurt Cunningham',
        body: ':)'
      }
    ],
  },
  {
    id: '3',
    updated_at: '1 day ago',
    message_title: 'Bonnie Adams',
    broadcast: false,
    unread: false,
    archived: false,
    messages: [
      {
        created_at: '1 day ago',
        currrent_user: true,
        author: 'Kurt Cunningham',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?'
      },
      {
        created_at: '1 day ago',
        currrent_user: false,
        author: 'Bonnie Adams',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean efficitur mi massa, at faucibus orci sagittis sit amet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean efficitur mi massa, at faucibus orci sagittis sit amet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean efficitur mi massa, at faucibus orci sagittis sit amet.'
      },
    ],
  }
];

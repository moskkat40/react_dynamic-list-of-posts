import classNames from 'classnames';
import React, { useState } from 'react';
import { User } from '../types/User';

type Props = {
  users: User[];
  setIsUser: (a: boolean) => void;
  getPostsByUserId: (a: number) => void;
  setOpenPostId: (a: null | number) => void;
  isUser: boolean;
};

export const UserSelector: React.FC<Props> = ({
  users,
  setIsUser,
  getPostsByUserId,
  setOpenPostId,
  isUser,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [isActiveUserId, setIsActiveUserId] = useState(0);
  const [userName, setUserName] = useState('');

  const handleClickDropdown = () => {
    if (!isActive) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  const handleShowUsersPosts = (
    event: React.MouseEvent<HTMLAnchorElement>,
    userId: number,
  ) => {

    if (!userId) {
      return;
    }

    event.preventDefault();
    setOpenPostId(null);
    setIsActiveUserId(userId);
    setIsUser(true);
    getPostsByUserId(userId);

    setUserName(event.currentTarget.innerHTML);

    setIsActive(false);
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': isActive })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleClickDropdown}
        >
          <span>{userName ? userName : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => (
            <a
              key={user.id}
              href={`#user-${user.id}`}
              className={classNames('dropdown-item', {
                'is-active': isActiveUserId === user.id,
              })}
              onClick={event => handleShowUsersPosts(event, user.id)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

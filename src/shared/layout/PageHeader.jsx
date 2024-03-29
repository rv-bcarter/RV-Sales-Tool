import React from 'react';

import MaterialIcon from 'material-icons-react';

import styles from '../../css/modules/page-header.module.css';
import layoutStyles from '../../css/global/layout.module.css';

export const PageHeader = ({
    pageTitleLeft,
    pageTitleIconLeft,
    pageTitleIconRight,
    pageTitleRightOnPress,
  }) => (
  <header className={`${styles.header}`}>
    <div className={`${styles.header__left}`}>
      <MaterialIcon icon={pageTitleIconLeft} color="#9496A2" />
      <p>{pageTitleLeft}</p>
    </div>
    {pageTitleIconRight ? (
      <div className={`${styles.header__right}`}>
        <span
          role="button"
          className={`${layoutStyles.clickable}`}
          onClick={() => pageTitleRightOnPress()}
        >
            <MaterialIcon
              icon={pageTitleIconRight}
              color="#0072FF"
            />
        </span>
      </div>
    ) : ''}
  </header>
)

export default PageHeader;

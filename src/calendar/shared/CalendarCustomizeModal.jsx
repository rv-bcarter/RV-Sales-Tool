import React from 'react';

import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Toggle,
} from 'rv-unity-react';

import CalendarNewCalForm from './CalendarNewCalForm';

import modalStyles from '../../css/components/modal.module.css';

// TODO: Consider making list a component in unity

const CalendarList = ({
    formVisibility,
    formVisibilityToggle,
    data
  }) => {
  return (
    <ul className={`${modalStyles.list}`}>
      {data.map((item, index) => (
        <li
          key={index}
          className={`
            ${modalStyles.item}
            ${item.visibility ? `${modalStyles.active}` : ''}
          `}
        >
          <span className={`${modalStyles.item__title}`}>
            {item.title}
          </span>
          <span className={`${modalStyles.item__action}`}>
            <Toggle
              label=" "
              id={item.id}
              checked={item.visibility}
              name={item.title}
              onChange={() => undefined}
              value={item.id}
            />
          </span>
        </li>
      ))}
      <li className={`${modalStyles.item}`}>
        <CalendarNewCalForm
          formVisibility={formVisibility}
          formVisibilityToggle={formVisibilityToggle}
        />
      </li>
    </ul>
  )
};

export const CalendarCustomizeModal = ({
    customizeModalVisibility,
    customizeModalOnClose,
    customizeCalFormViz,
    customizeCalFormToggle,
    data,
  }) => {
  return (
    <Modal
      visible={customizeModalVisibility}
    >
      <ModalHeader
        title="Customize Your Calendar"
        description="Set the visibility of a calendar by toggling it on or off."
        onClose={() => customizeModalOnClose()}
      />
      <ModalBody>
        <CalendarList
          data={data}
          formVisibility={customizeCalFormViz}
          formVisibilityToggle={customizeCalFormToggle}
        />
      </ModalBody>
      <ModalFooter>
        <Button
          label="Update Calendar"
          size={0}
          onPress={() => customizeModalOnClose()}
        />
      </ModalFooter>
    </Modal>
  )
};

export default CalendarCustomizeModal;

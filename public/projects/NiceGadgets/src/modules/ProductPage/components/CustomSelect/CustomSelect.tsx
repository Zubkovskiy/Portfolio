import { FC } from 'react';
import classNames from 'classnames';
import styles from './CustomSelect.module.scss';
import { useDropdown } from '../../../shared/hooks/useDropdown';

interface CustomSelectProps {
  title: string;
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
}

export const CustomSelect: FC<CustomSelectProps> = ({
  title,
  options,
  selected,
  onSelect,
}) => {
  const dropdown = useDropdown();

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>{title}</p>
      <div className={styles.selectContainer} ref={dropdown.ref}>
        <div
          className={classNames(styles.selectButton, {
            [styles.focus]: dropdown.isOpen,
          })}
          onClick={dropdown.toggle}
        >
          <span className={styles.text}>{selected}</span>
          <div
            className={classNames(styles.arrow, {
              [styles.arrow_up]: dropdown.isOpen,
              [styles.arrow_down]: !dropdown.isOpen,
            })}
          />
        </div>

        <ul
          className={classNames(styles.optionsList, {
            [styles.optionsListVisible]: dropdown.isOpen,
          })}
        >
          {options.map((option, i) => (
            <li
              key={i}
              className={styles.option}
              onClick={() => {
                onSelect(option);
                dropdown.close();
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

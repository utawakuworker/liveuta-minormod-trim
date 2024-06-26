'use client';
import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import cx from 'classnames';
import { BiArrowFromLeft } from 'react-icons/bi';
import { BsSliders } from 'react-icons/bs';
import OutsideClickHandler from 'react-outside-click-handler';
import { SelectType } from '@/type';
import { schedule } from '@inner/_lib/atom';
import { useRouter } from 'next/navigation';
import { useAtom } from 'jotai';
import * as styles from './navSection.css';

interface NavSelectBoxProps {}

export default function NavSelectBox({}: NavSelectBoxProps) {
  const router = useRouter();
  const [active, setActive] = useState(false);
  const [select] = useAtom(schedule.selectAtom);
  const [selectedSchedule] = useAtom(schedule.selectedScheduleAtom);

  const handleSelect = async (e: React.MouseEvent<HTMLUListElement, MouseEvent>) => {
    const target = e.target as HTMLElement;
    const li = target.closest('li')?.dataset.value as SelectType;

    if (!li || li === select) {
      setActive(() => false);
    } else {
      const selectCookie = new Cookies();
      selectCookie.set('select', li, { path: '/', maxAge: 60 * 60 * 24 * 30 * 3 }); //3개월 저장
      setActive(() => false);
      // select cache 삭제
      router.refresh();
    }
  };

  const totalText = `전체: ${selectedSchedule.length.total || 0}`;
  const streamText = `방송: ${selectedSchedule.length?.stream || 0}`;
  const videoText = `동영상: ${selectedSchedule.length?.video || 0}`;

  const selectedText = () => {
    switch (select) {
      case 'stream':
        return streamText;
      case 'video':
        return videoText;
      default:
        return totalText;
    }
  };

  const handleToggle = (e: MouseEvent | React.MouseEvent) => {
    e.stopPropagation();
    setActive((pre) => !pre);
  };

  const handleClose = (e: MouseEvent | React.MouseEvent) => {
    e.stopPropagation();
    const tartget = e.target as HTMLElement;
    const id = tartget.id;
    if (id === 'nav-selectbox-button') return;
    setActive(() => false);
  };

  return (
    <div className={styles.navSelectBox}>
      <button className={styles.navButton} id="nav-selectbox-button" onClick={handleToggle}>
        <BsSliders size="1.25rem" />
        {selectedText()}
      </button>
      <OutsideClickHandler onOutsideClick={handleClose}>
        <div className={cx(styles.side, active && 'active')}>
          <button className={styles.sideButton} onClick={handleClose}>
            <BiArrowFromLeft size="1.25rem" />
          </button>
          <ul className={styles.sideList} onClick={handleSelect}>
            <li className={cx(styles.sideItem, select === 'all' && 'active')} data-value={'all'}>
              {totalText}
            </li>
            <li
              className={cx(styles.sideItem, select === 'stream' && 'active')}
              data-value={'stream'}
            >
              {streamText}
            </li>
            <li
              className={cx(styles.sideItem, select === 'video' && 'active')}
              data-value={'video'}
            >
              {videoText}
            </li>
          </ul>
        </div>
      </OutsideClickHandler>
    </div>
  );
}

import Modal from './Modal';
import { MouseEvent } from 'react';
import useTheme from '@/hook/useTheme';
import { ThemeType } from '@/type';
import { gtagClick } from '@inner/_lib/gtag';
import portal from '@/model/portal';
import * as styles from './themeModal.css';

interface ThemeModalButtonProps {
  primaryColor: string;
  secondaryColor: string;
}

function ThemeModalButton({ primaryColor, secondaryColor }: ThemeModalButtonProps) {
  return (
    <div className={styles.themeModalButton}>
      <div className={styles.primary} style={{ backgroundColor: primaryColor }}>
        <div className={styles.secondary} style={{ backgroundColor: secondaryColor }}></div>
      </div>
    </div>
  );
}

interface ThemeModalProps {
  onClose: () => void;
}

const THEME_MODAL_ID = 'themeModal';

export default portal(THEME_MODAL_ID, function ThemeModal({ onClose }: ThemeModalProps) {
  const { setTheme } = useTheme();

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const button = target.closest('button');
    const selectedTheme = button?.dataset.theme as ThemeType | undefined;
    if (selectedTheme === undefined) return;

    gtagClick({
      target: THEME_MODAL_ID,
      content: selectedTheme,
      detail: selectedTheme,
      action: 'themeChange',
    });

    setTheme(selectedTheme);
  };

  return (
    <Modal id={THEME_MODAL_ID} onClose={onClose} title="테마를 선택 해주세요">
      <div className={styles.content} onClick={handleClick}>
        <button data-theme="theme1">
          <ThemeModalButton primaryColor="#ffc1cc" secondaryColor="#ed4463" />
        </button>
        <button data-theme="theme2">
          <ThemeModalButton primaryColor="#c9f5d9" secondaryColor="#fada28" />
        </button>
        <button data-theme="theme3">
          {/* <ThemeModalButton primaryColor="#dbf0f9" secondaryColor="#ffc0cb" /> */}
          <ThemeModalButton primaryColor="#dbf0f9" secondaryColor="#f8570c" />
        </button>
        <button data-theme="theme4">
          <ThemeModalButton primaryColor="#152238" secondaryColor="#ffd700" />
        </button>
        <button data-theme="theme5">
          <ThemeModalButton primaryColor="#010b13" secondaryColor="#cc2444" />
        </button>
      </div>
    </Modal>
  );
});

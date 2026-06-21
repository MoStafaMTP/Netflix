import { type ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { IoClose } from 'react-icons/io5';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  /** Max width utility class, e.g. "max-w-3xl". */
  maxWidth?: string;
}

const Modal = ({ isOpen, onClose, title, children, maxWidth = 'max-w-3xl' }: ModalProps) => {
  // Close on Escape and lock body scroll while open.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label={title ?? 'Dialog'}
        >
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            className={`relative z-10 w-full ${maxWidth} overflow-hidden rounded-lg bg-netflix-black shadow-2xl`}
            initial={{ scale: 0.92, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.92, y: 20, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          >
            <button
              onClick={onClose}
              aria-label="Close dialog"
              className="absolute right-3 top-3 z-20 grid h-9 w-9 place-items-center rounded-full bg-netflix-black/80 text-white transition hover:bg-netflix-red"
            >
              <IoClose size={22} />
            </button>
            {title && (
              <h2 className="px-6 pt-6 text-2xl font-bold">{title}</h2>
            )}
            <div className="p-2 sm:p-4">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default Modal;

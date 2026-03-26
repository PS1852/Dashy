import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function Modal({ isOpen, onClose, title, children, size = 'md' }: ModalProps) {
  const sizeMap = { sm: '400px', md: '560px', lg: '720px', xl: '900px' };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={onClose}
        >
          <motion.div
            className="modal-container"
            style={{ maxWidth: sizeMap[size] }}
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            onClick={e => e.stopPropagation()}
          >
            {title && (
              <div className="modal-header">
                <h2 className="modal-title">{title}</h2>
                <button className="modal-close" onClick={onClose} aria-label="Close">
                  <X size={18} />
                </button>
              </div>
            )}
            {!title && (
              <button className="modal-close modal-close-abs" onClick={onClose} aria-label="Close">
                <X size={18} />
              </button>
            )}
            <div className="modal-body">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

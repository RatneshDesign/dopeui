import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Toast = ({ message, onClose }) => {

  useEffect(() => {
    const timer = setTimeout(onClose, 2000); 
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          style={{
            position: "fixed",
            bottom: "30px",
            right: "2%",
            background: "#222",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.39)",
            zIndex: 9999,
            fontSize: "14px",
            opacity: 1,
          }}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;

import { useState } from "react";
import { motion } from "framer-motion";
import "../styles/IngredientInput.css";

const IngredientInput = ({ onTranslate }) => {
  const [input, setInput] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = input.trim();
    if (!value) return;
    onTranslate(value);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 1200);
  };

  const MotionForm = motion.form;
  const MotionDiv = motion.div;
  const MotionButton = motion.button;

  return (
    <MotionForm
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="ingredient-input-form"
    >
      <MotionDiv
        animate={success ? { boxShadow: "0px 0px 12px rgba(34,197,94,0.8)" } : {}}
        transition={{ duration: 0.6 }}
        className={`input-container ${success ? "success" : ""}`}
      >
        <label htmlFor="ingredient-input" className="visually-hidden">
          Ingredient label input
        </label>

        <textarea
          id="ingredient-input"
          aria-label="Ingredient label input"
          rows={5}
          placeholder="Paste an ingredient label here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="ingredient-textarea"
        />
      </MotionDiv>

      <div className="actions">
        <MotionButton
          type="submit"
          aria-label="Translate ingredient label"
          whileTap={{ scale: 0.98 }}
          whileHover={{ scale: 1.02 }}
          className="btn btn-primary"
        >
          Translate
        </MotionButton>

        <button
          type="button"
          aria-label="Clear ingredient input"
          onClick={() => setInput("")}
          className="btn btn-secondary"
        >
          Clear
        </button>
      </div>

      <div
        role="status"
        aria-live="polite"
        className={`submit-status ${success ? "visible" : ""}`}
      >
        Sent!
      </div>
    </MotionForm>
  );
};

export default IngredientInput;
